import { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Briefcase,
  Clock,
  Bookmark,
  ArrowRight,
  X,
  Sparkles,
  Menu
} from "lucide-react";

import "./App.css";

const API_URL = "http://localhost:5000/api/jobs";
const APPLICATION_API_URL = "http://localhost:5000/api/applications";

const jobColors = {
  1: "blue",
  2: "purple",
  3: "green",
  4: "orange",
  5: "blue",
  6: "purple"
};

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [jobType, setJobType] = useState("All");
  const [savedJobs, setSavedJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showSaved, setShowSaved] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [application, setApplication] = useState({
    name: "",
    email: "",
    skills: ""
  });

  const [submitting, setSubmitting] = useState(false);
  const [applicationError, setApplicationError] = useState("");

  // Fetch jobs from Express backend
  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Unable to fetch jobs from the server.");
      }

      const result = await response.json();

      if (!result.success || !Array.isArray(result.data)) {
        throw new Error("Invalid response received from the server.");
      }

      const jobsWithColors = result.data.map((job) => ({
        ...job,
        color: jobColors[job.id] || "blue"
      }));

      setJobs(jobsWithColors);

    } catch (err) {
      console.error("Job fetching error:", err);

      setError(
        "Unable to connect to the server. Please check whether the backend is running."
      );

    } finally {
      setLoading(false);
    }
  };

  // Load jobs when the component starts
  useEffect(() => {
    fetchJobs();
  }, []);

  const categories = [
    "All",
    "Engineering",
    "Artificial Intelligence",
    "Quality Assurance",
    "Data Science"
  ];

  // Search and filter jobs
  const filteredJobs = jobs.filter((job) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      job.title.toLowerCase().includes(searchText) ||
      job.skills.join(" ").toLowerCase().includes(searchText) ||
      job.department.toLowerCase().includes(searchText);

    const matchesCategory =
      category === "All" || job.department === category;

    const matchesType =
      jobType === "All" || job.type === jobType;

    const matchesSaved =
      !showSaved || savedJobs.includes(job.id);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesType &&
      matchesSaved
    );
  });

  // Save or remove a bookmarked job
  const toggleSave = (id) => {
    setSavedJobs((previous) =>
      previous.includes(id)
        ? previous.filter((jobId) => jobId !== id)
        : [...previous, id]
    );
  };

  // Submit application to backend
  const handleApply = async (e) => {
    e.preventDefault();

    if (!selectedJob || submitting) {
      return;
    }

    try {
      setSubmitting(true);
      setApplicationError("");

      const response = await fetch(APPLICATION_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: application.name,
          email: application.email,
          skills: application.skills,
          jobId: selectedJob.id
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Application submission failed."
        );
      }

      alert(
        "Application submitted successfully! Thank you, " +
        application.name + "."
      );

      setApplication({
        name: "",
        email: "",
        skills: ""
      });

      setSelectedJob(null);

    } catch (err) {
      console.error("Application submission error:", err);

      setApplicationError(
        err.message || "Something went wrong. Please try again."
      );

    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="app">

      {/* Navigation */}

      <nav className="navbar">
        <div className="nav-container">

          <a href="#" className="logo">
            <span className="logo-icon">C</span>
            <span>
              CYNBIT<span className="logo-light"> CAREERS</span>
            </span>
          </a>

          <button
            className="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            <Menu size={24} />
          </button>

          <div className={`nav-links ${menuOpen ? "open" : ""}`}>

            <a href="#home" onClick={() => setMenuOpen(false)}>
              Home
            </a>

            <a href="#jobs" onClick={() => setMenuOpen(false)}>
              Explore Jobs
            </a>

            <a href="#about" onClick={() => setMenuOpen(false)}>
              About
            </a>

            <button
              className="saved-button"
              onClick={() => {
                setShowSaved(!showSaved);
                document.getElementById("jobs")?.scrollIntoView();
                setMenuOpen(false);
              }}
            >
              <Bookmark size={17} />
              Saved ({savedJobs.length})
            </button>

          </div>
        </div>
      </nav>

      {/* Hero Section */}

      <section className="hero" id="home">
        <div className="hero-content">

          <div className="hero-badge">
            <Sparkles size={15} />
            Discover your next opportunity
          </div>

          <h1>
            Find Your Next
            <span> Career Opportunity</span>
          </h1>

          <p>
            Discover exciting opportunities, explore your potential
            and build your future with innovative technology teams.
          </p>

          <div className="search-box">
            <Search size={22} />

            <input
              type="text"
              placeholder="Search jobs, skills or departments..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button
              onClick={() =>
                document.getElementById("jobs")?.scrollIntoView()
              }
            >
              Search Jobs
            </button>
          </div>

          <div className="hero-stats">

            <div>
              <strong>{jobs.length}+</strong>
              <span>Opportunities</span>
            </div>

            <div>
              <strong>4+</strong>
              <span>Departments</span>
            </div>

            <div>
              <strong>2</strong>
              <span>Job Types</span>
            </div>

          </div>
        </div>
      </section>

      {/* Job Section */}

      <section className="jobs-section" id="jobs">

        <div className="section-heading">

          <div>
            <span className="section-label">
              CAREER OPPORTUNITIES
            </span>

            <h2>
              {showSaved
                ? "Your Saved Jobs"
                : "Explore Opportunities"}
            </h2>

            <p>
              Find a role that matches your skills and career goals.
            </p>
          </div>

          {showSaved && (
            <button
              className="clear-filter"
              onClick={() => setShowSaved(false)}
            >
              Show All Jobs
            </button>
          )}

        </div>

        {/* Filters */}

        <div className="filters">

          <div className="category-filters">

            {categories.map((item) => (
              <button
                key={item}
                className={category === item ? "active" : ""}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}

          </div>

          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
          >
            <option value="All">All Job Types</option>
            <option value="Internship">Internship</option>
            <option value="Full-time">Full-time</option>
          </select>

        </div>

        {/* Loading Message */}

        {loading && (
          <div className="empty-state">
            <h3>Loading opportunities...</h3>
            <p>
              Please wait while we fetch jobs from the server.
            </p>
          </div>
        )}

        {/* Error Message */}

        {!loading && error && (
          <div className="empty-state">
            <h3>Something went wrong</h3>
            <p>{error}</p>

            <button onClick={fetchJobs}>
              Try Again
            </button>
          </div>
        )}

        {/* Job Cards */}

        {!loading && !error && (
          <>
            <div className="job-grid">

              {filteredJobs.map((job) => (
                <div className="job-card" key={job.id}>

                  <div className="card-top">

                    <div className={`job-icon ${job.color}`}>
                      <Briefcase size={23} />
                    </div>

                    <button
                      className={`bookmark ${
                        savedJobs.includes(job.id)
                          ? "bookmarked"
                          : ""
                      }`}
                      onClick={() => toggleSave(job.id)}
                      aria-label={
                        savedJobs.includes(job.id)
                          ? "Remove saved job"
                          : "Save job"
                      }
                    >
                      <Bookmark
                        size={20}
                        fill={
                          savedJobs.includes(job.id)
                            ? "currentColor"
                            : "none"
                        }
                      />
                    </button>

                  </div>

                  <span className="department">
                    {job.department}
                  </span>

                  <h3>{job.title}</h3>

                  <p className="job-description">
                    {job.description}
                  </p>

                  <div className="job-info">

                    <span>
                      <MapPin size={15} />
                      {job.location}
                    </span>

                    <span>
                      <Clock size={15} />
                      {job.experience}
                    </span>

                  </div>

                  <div className="skills">
                    {job.skills.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>

                  <div className="card-bottom">

                    <span className="job-type">
                      {job.type}
                    </span>

                    <button
                      className="details-button"
                      onClick={() => {
                        setApplicationError("");
                        setSelectedJob(job);
                      }}
                    >
                      View Details
                      <ArrowRight size={16} />
                    </button>

                  </div>

                </div>
              ))}

            </div>

            {/* Empty State */}

            {filteredJobs.length === 0 && (
              <div className="empty-state">

                <Search size={35} />

                <h3>No opportunities found</h3>

                <p>
                  Try another keyword or change your filters.
                </p>

                <button
                  onClick={() => {
                    setSearch("");
                    setCategory("All");
                    setJobType("All");
                    setShowSaved(false);
                  }}
                >
                  Clear Filters
                </button>

              </div>
            )}
          </>
        )}

      </section>

      {/* About Section */}

      <section className="about-section" id="about">

        <div>
          <span className="section-label">
            BUILD YOUR FUTURE
          </span>

          <h2>Make Your Next Career Move Count.</h2>

          <p>
            Explore opportunities, showcase your skills and take
            the next step towards your professional goals.
          </p>
        </div>

        <a href="#jobs">
          Explore Opportunities
          <ArrowRight size={18} />
        </a>

      </section>

      {/* Footer */}

      <footer className="footer">

        <div className="footer-logo">
          <span className="logo-icon">C</span>
          CYNBIT CAREERS
        </div>

        <p>
          © 2026 Cynbit Careers Explorer.
          Independent assessment prototype.
        </p>

      </footer>

      {/* Job Details and Application Modal */}

      {selectedJob && (
        <div
          className="modal-overlay"
          onClick={() => {
            if (!submitting) {
              setSelectedJob(null);
              setApplicationError("");
            }
          }}
        >

          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="modal-close"
              onClick={() => {
                if (!submitting) {
                  setSelectedJob(null);
                  setApplicationError("");
                }
              }}
              aria-label="Close job details"
              disabled={submitting}
            >
              <X size={22} />
            </button>

            <span className="section-label">
              JOB DETAILS
            </span>

            <h2>{selectedJob.title}</h2>

            <p className="modal-description">
              {selectedJob.description}
            </p>

            <h4>Required Skills</h4>

            <div className="skills">
              {selectedJob.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>

            <div className="modal-divider"></div>

            <h3>Apply for this opportunity</h3>

            <form onSubmit={handleApply}>

              <label>Full Name</label>

              <input
                required
                type="text"
                minLength="2"
                placeholder="Enter your name"
                value={application.name}
                disabled={submitting}
                onChange={(e) =>
                  setApplication({
                    ...application,
                    name: e.target.value
                  })
                }
              />

              <label>Email Address</label>

              <input
                required
                type="email"
                placeholder="Enter your email"
                value={application.email}
                disabled={submitting}
                onChange={(e) =>
                  setApplication({
                    ...application,
                    email: e.target.value
                  })
                }
              />

              <label>Technical Skills</label>

              <input
                required
                type="text"
                minLength="2"
                placeholder="Java, Python, React..."
                value={application.skills}
                disabled={submitting}
                onChange={(e) =>
                  setApplication({
                    ...application,
                    skills: e.target.value
                  })
                }
              />

              {applicationError && (
                <p
                  role="alert"
                  style={{
                    color: "red",
                    marginTop: "10px"
                  }}
                >
                  {applicationError}
                </p>
              )}

              <button
                className="submit-button"
                type="submit"
                disabled={submitting}
              >
                {submitting
                  ? "Submitting..."
                  : "Submit Application"}
              </button>

              <p className="demo-notice">
                Independent assessment prototype.
                Application data is stored temporarily by the backend.
              </p>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default App;
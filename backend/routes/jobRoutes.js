const express = require("express");
const router = express.Router();

const jobs = require("../data/jobs");

// GET all jobs with search and filters
router.get("/", (req, res) => {
  const { search, department, type } = req.query;

  let filteredJobs = [...jobs];

  if (search) {
    filteredJobs = filteredJobs.filter(job =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.skills.some(skill =>
        skill.toLowerCase().includes(search.toLowerCase())
      )
    );
  }

  if (department) {
    filteredJobs = filteredJobs.filter(
      job => job.department.toLowerCase() === department.toLowerCase()
    );
  }

  if (type) {
    filteredJobs = filteredJobs.filter(
      job => job.type.toLowerCase() === type.toLowerCase()
    );
  }

  res.status(200).json({
    success: true,
    count: filteredJobs.length,
    data: filteredJobs
  });
});

// GET job by ID
router.get("/:id", (req, res) => {
  const job = jobs.find(
    job => job.id === Number(req.params.id)
  );

  if (!job) {
    return res.status(404).json({
      success: false,
      message: "Job not found"
    });
  }

  res.status(200).json({
    success: true,
    data: job
  });
});

module.exports = router;
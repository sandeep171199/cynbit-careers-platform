const express = require("express");
const cors = require("cors");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;
const connectDB = require("./database");

// Middleware
app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
// Home API
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Cynbit Careers API",
        status: "Running successfully"
    });
});

// Health Check API
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Cynbit Backend Server is healthy"
    });
});

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Cynbit Backend running on http://localhost:${PORT}`);
    });
};

startServer();
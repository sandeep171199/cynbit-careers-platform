const express = require("express");
const router = express.Router();
const { z } = require("zod");

const jobs = require("../data/jobs");
const Application = require("../models/Application");

const applicationSchema = z.object({
    name: z.string().trim().min(2, "Name must contain at least 2 characters"),
    email: z.string().trim().email("Enter a valid email address"),
    skills: z.string().trim().min(2, "Please enter your skills"),
    jobId: z.number().int().positive()
});

router.post("/", async (req, res) => {
    try {
        // Validate application details
        const validation = applicationSchema.safeParse(req.body);

        if (!validation.success) {
            return res.status(400).json({
                success: false,
                message: "Invalid application details",
                errors: validation.error.issues
            });
        }

        // Check whether the selected job exists
        const selectedJob = jobs.find(
            job => job.id === validation.data.jobId
        );

        if (!selectedJob) {
            return res.status(404).json({
                success: false,
                message: "Job not found. Cannot submit application."
            });
        }

        // Save application in MongoDB
        const application = await Application.create(validation.data);

        return res.status(201).json({
            success: true,
            message: "Application submitted successfully",
            data: application
        });

    } catch (error) {

        // Handle duplicate applications
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "You have already applied for this job."
            });
        }

        console.error("Application Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Something went wrong while submitting your application."
        });
    }
});

module.exports = router;
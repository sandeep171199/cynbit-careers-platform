const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },

        skills: {
            type: String,
            required: true,
            trim: true
        },

        jobId: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

// Prevent duplicate applications for the same job and email
applicationSchema.index(
    { email: 1, jobId: 1 },
    { unique: true }
);

module.exports = mongoose.model("Application", applicationSchema);
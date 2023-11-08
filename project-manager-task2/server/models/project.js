const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        desc: {
            type: String,
            required: true,
        },
        department: {
            type: String,
            required: true,
        },
        startDate: {
            type: String,
            required: true,
        },
        endDate: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['backlog', 'Todo', 'In-progress', 'Completed'],
            default: 'backlog',
        },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    { timestamps: true }
);


const Project = mongoose.model('Project', ProjectSchema);
module.exports = Project;
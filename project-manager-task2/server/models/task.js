const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        desc: { type: String, required: true },
        deadline: { type: String, required: true },
        status: {
            type: String,
            enum: ['backlog', 'Todo', 'In-progress', 'Completed'],
            default: 'backlog',
        },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    { timestamps: true }
);


const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;
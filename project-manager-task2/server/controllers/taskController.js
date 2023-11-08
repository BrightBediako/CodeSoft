const User = require('../models/user.js');
const Task = require('../models/task.js');

const addTask = async (req, res) => {
    const { name, desc, deadline, id } = req.body;

    try {
        if (!name || !desc || !deadline) {
            return res.status(400).send('Name, description, and deadline are required.');
        }
        const taskDetail = await new Task({
            name,
            desc,
            deadline,
            createdBy: id,
        });
        await taskDetail.save();
        return res.status(200).send(taskDetail);
    } catch (error) {
        return res.status(400).send('Failed to add Task');
    }
};

const getAllTasks = async (req, res) => {
    const { id } = req.query;
    try {
        let tasklist = await Task.find({ createdBy: id });
        return res.status(200).send(tasklist);
    } catch (error) {
        return res.status(400).send(error);
    }
};

const editTask = async (req, res) => {
    const { id, name, desc, deadline } = req.body;

    try {
        // Find the task by its ID
        let task = await Task.findById(id);

        if (!task) {
            return res.status(404).send('Task not found');
        }

        // Update the task fields
        if (name) task.name = name;
        if (desc) task.desc = desc;
        if (deadline) task.deadline = deadline;

        // Save the updated task
        await task.save();

        return res.status(200).send(task);
    } catch (error) {
        return res.status(400).send('Failed to update Task');
    }
};

const statusChange = async (req, res) => {
    const { id, string } = req.body;

    try {
        let task = await Task.findById({ _id: id });
        if (string === 'right') {
            if (task.status === 'backlog') {
                task.status = 'Todo';
                task.save();
                return res.send(task);
            } else if (task.status === 'Todo') {
                task.status = 'In-progress';
                task.save();
                return res.send(task);
            } else if (task.status === 'In-progress') {
                task.status = 'Completed';
                task.save();
                return res.send(task);
            }
        } else {
            if (task.status === 'Completed') {
                task.status = 'In-progress';
                task.save();
                return res.send(task);
            } else if (task.status === 'In-progress') {
                task.status = 'Todo';
                task.save();
                return res.send(task);
            } else if (task.status === 'Todo') {
                task.status = 'backlog';
                task.save();
                return res.send(task);
            }
        }
    } catch (error) { }
};

const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        let response = await Task.findByIdAndDelete(id);
        return res.status(200).send(response);
    } catch (error) {
        return res.status(400).send('deleteFailed');
    }
};

module.exports = {
    addTask,
    getAllTasks,
    editTask,
    statusChange,
    deleteTask,
};

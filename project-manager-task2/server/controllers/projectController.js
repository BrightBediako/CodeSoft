const User = require('../models/user.js');
// const Task = require('../models/task.js');
const Project = require('../models/project.js');

const addProject = async (req, res) => {
    const { name, desc, department, startDate, endDate, id } = req.body;

    try {
        if (!name || !desc || !department || !startDate || !endDate) {
            return res.status(400).send('All fields are required.');
        }
        const projectDetail = await new Project({
            name,
            desc,
            department,
            startDate,
            endDate,
            createdBy: id,
        });
        await projectDetail.save();
        return res.status(200).send(projectDetail);
    } catch (error) {
        return res.status(400).send('Failed to add project');
    }
};

const getAllProjects = async (req, res) => {
    const { id } = req.query;
    try {
        let projectlist = await Project.find({ createdBy: id });
        return res.status(200).send(projectlist);
    } catch (error) {
        return res.status(400).send(error);
    }
};

const editProject = async (req, res) => {
    const { id, name, desc, department, startDate, endDate } = req.body;

    try {
        // Find the Project by its ID
        let project = await Project.findById(id);

        if (!project) {
            return res.status(404).send('Project not found');
        }

        // Update the Project fields
        if (name) project.name = name;
        if (desc) project.desc = desc;
        if (department) project.department = department;
        if (startDate) project.startDate = startDate;
        if (endDate) project.endDate = endDate;

        // Save the updated Project
        await project.save();

        return res.status(200).send(project);
    } catch (error) {
        return res.status(400).send('Failed to update Project');
    }
};

const statusChange = async (req, res) => {
    const { id, string } = req.body;

    try {
        let project = await Project.findById({ _id: id });
        if (string === 'right') {
            if (project.status === 'backlog') {
                project.status = 'Todo';
                project.save();
                return res.send(project);
            } else if (project.status === 'Todo') {
                project.status = 'In-progress';
                project.save();
                return res.send(project);
            } else if (project.status === 'In-progress') {
                project.status = 'Completed';
                project.save();
                return res.send(project);
            }
        } else {
            if (project.status === 'Completed') {
                project.status = 'In-progress';
                project.save();
                return res.send(project);
            } else if (project.status === 'In-progress') {
                project.status = 'Todo';
                project.save();
                return res.send(project);
            } else if (project.status === 'Todo') {
                project.status = 'backlog';
                project.save();
                return res.send(project);
            }
        }
    } catch (error) { }
};

const deleteProject = async (req, res) => {
    const { id } = req.params;
    try {
        let response = await Project.findByIdAndDelete(id);
        return res.status(200).send(response);
    } catch (error) {
        return res.status(400).send('deleteFailed');
    }
};

module.exports = {
    addProject,
    getAllProjects,
    editProject,
    statusChange,
    deleteProject,
};

const express = require('express');
const Tasks = require('../models/Tasks');


const { authMiddleware } = require('../middlewares/auth');
const { createTasks } = require('../controllers/taskController');
const Project = require('../models/Project');

const taskRouter = express.Router();

taskRouter.use(authMiddleware);

taskRouter.get("/api/projects/:projectId/tasks", async (req, res) => {
    try {
        const userTasks = await Tasks.find({user: req.user._id});
        if (req.user._id !== userTasks.user) {
            return res.status(400).json(error)
        }
        res.json(userTasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

taskRouter.post("/api/projects/:projectId/tasks", createTasks);


taskRouter.delete("/api/projects/:projectId", async (req, res) => {
    try {
        const deleteProject = await Project.findById(req.params.projectId)
        if (req.user.projectId !== deleteProject) {
            return res.status(403).json({message: "You are unable to delete this note"})
        }
        const task = await Project.findByIdAndDelete(req.params.projectId)
        if (!task) {
            return res.status(404).json({ message: 'No note found with this id!'})
        }
        res.json({ message: 'Note deleted'})
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
});

module.exports = {taskRouter}
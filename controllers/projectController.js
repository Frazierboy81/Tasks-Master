const Project = require('../models/Project');



const createProject = async (req, res) => {
    try{
        const newProject = await Project.create({
            ...req.body,
            user: req.user._id
        });
        res.status(201).json(newProject)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {createProject}
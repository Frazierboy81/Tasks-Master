const Tasks = require('../models/Tasks');


const createTasks = async (req, res) => {
    try {
        const newTasks = await Tasks.create({
            ...req.body,
            user: req.user._id
        });
        res.status(201).json(newTasks)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {createTasks}
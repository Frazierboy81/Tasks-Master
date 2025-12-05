const express = require('express');
const {createProject} = require('../controllers/projectController')
const Project = require('../models/Project')

const { authMiddleware } = require('../middlewares/auth');
const { registerUser } = require('../controllers/userController');

const projectRouter = express.Router();

projectRouter.use(authMiddleware);

const NotLoggedIn = (req, res, next) => {
    console.log(req.user)
    if (!req.user) {
        
      return res.status(401).json({ message: 'You must be logged in to see this!' });
    } else {
        next()
    }
}

/**
 * GET /api/projects
 */
projectRouter.get("/", async (req, res) => {
  try {
    const userProjects = await Project.find({ user: req.user._id });
    res.json(userProjects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

projectRouter.use(NotLoggedIn)


projectRouter.post("/", createProject)


module.exports = projectRouter;
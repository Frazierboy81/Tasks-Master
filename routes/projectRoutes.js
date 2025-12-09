const express = require('express');
const {createProject} = require('../controllers/projectController')
const Project = require('../models/Project')

const { authMiddleware } = require('../middlewares/auth');
// const { registerUser } = require('../controllers/userController');

const projectRouter = express.Router();

projectRouter.use(authMiddleware);

const NotLoggedIn = (req, res, next) => {
    console.log(req.user)
    if (!req.user) {
        
      return res.status(401).json({ message: 'You must be logged in to see this!'});
    } else {
        next()
    }
}

/**
 * GET /api/projects
 */
projectRouter.get("/", async (req, res) => {
  try {
    const userProjects = await Project.find({ user: req.user.id});
    res.json(userProjects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

projectRouter.get("/:projectId", async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId);

    if (!project) {
      return res
        .status(404)
        .json({ message: `Project with id: ${projectId} not found!` });
    }

    // Authorization
    console.log(req.user._id);
    console.log(project.user);
    
    if (project.user.toString() !== req.user._id) {
      return res.status(403).json({ message: "User is not authorized!" });
    }

    res.json(project);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

projectRouter.use(NotLoggedIn)


projectRouter.post("/", createProject)


module.exports = projectRouter;
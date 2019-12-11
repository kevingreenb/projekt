const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");

const auth = require("./auth");
const User = require("../models/User");
const Project = require("../models/Project");
const deletion = require("../models/Deletion");

// get all projects
router.get("/", auth, async (req, res) => {
  try {
    let projects = await Project.find().sort({ createdDate: -1 });
    res.json(projects);
    if (!projects) {
      res.status(404).send({ message: "No projects found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error with /get");
  }
});

// create a project
router.post(
  "/",
  [
    auth,
    [
      check("projectTitle", "Project Tittle is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const { projectTitle, projectDescription, deliveryDate } = req.body;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const user = await User.findById(req.user.id).select("-password");
      const createdBy = user.name;

      project = new Project({
        projectTitle,
        projectDescription,
        deliveryDate,
        createdBy,
        user
      });

      await project.save();
      res.json(project);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

//register a delition
router.post("/deletion", auth, async (req, res) => {
  try {
    const {
      username,
      projectTitle,
      projectDescription,
      deliveryDate
    } = req.body;
    let entry = { username, projectTitle, projectDescription, deliveryDate };

    await deletion.create(entry);
    return res.status(200).json(entry);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// get the delitions for reports
router.get("/deletions", auth, async (req, res) => {
  try {
    let entries = await deletion.findAll();
    res.json(entries);
  } catch (error) {
    console.error("Server Error with /deletions " + error.message);
    res.status(500).send("Server Error with /deletions");
  }
});

// delete project by id
router.delete("/:id", auth, async (req, res) => {
  try {
    let project = await Project.findById(req.params.id);
    if (!project) {
      res.status(404).send({ message: "No project found" });
    }
    await project.remove();
    res.json({ message: "Project was deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//get project by id
router.get("/:id", auth, async (req, res) => {
  try {
    console.error(req.params.id);
    let project = await Project.findById(req.params.id);
    if (!project) {
      res.status(404).send({ message: "No project found" });
    }
    res.json(project);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error with get /:id");
  }
});

//update project by id
router.post("/:id", auth, async (req, res) => {
  try {
    let project = await Project.findById(req.params.id);
    const { projectTitle, projectDescription, deliveryDate } = req.body;
    project.projectTitle = projectTitle;
    project.projectDescription = projectDescription;
    project.deliveryDate = deliveryDate;

    await project.save();
    res.json(project);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error with patch /:id");
  }
});

// delete post by id
router.post("/post/delete/:id", auth, async (req, res) => {
  try {
    let project = await Project.findById(req.params.id);
    const { postId } = req.body;
    project.posts = project.posts.filter(post => post._id != postId);

    await project.save();
    res.json(project);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error with delete /post/delete/:id");
  }
});

// post on a project by id
router.post("/post/:id", auth, async (req, res) => {
  try {
    let project = await Project.findById(req.params.id);
    const { post } = req.body;
    project.posts = [post, ...project.posts];
    await project.save();
    res.json(project);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error with post /post/:id");
  }
});

module.exports = router;

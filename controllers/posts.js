const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");

const auth = require("./auth");
const User = require("../models/User");
const Post = require("../models/Post");

router.get("/", auth, async (req, res) => {
  try {
    let posts = await Post.find().sort({ createdDate: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.post(
  "/",
  auth,
  [
    check("text", "Text is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const { text } = req.body;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const user = await User.findById(req.user.id).select("-password");
      let name = user.name;
      post = new Post({ text, name, user });

      await post.save();
      res.json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

router.delete("/:id", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).send({
        message: "Post not found"
      });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    await post.remove();
    res.json({ message: "Post was deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

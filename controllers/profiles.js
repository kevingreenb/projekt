const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");

const auth = require("./auth");
const User = require("../models/User");
const Profile = require("../models/Profile");

router.get("/", async (req, res) => {
  try {
    let profiles = await Profile.find();
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    let profile = await Profile.findById(req.params.id);
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.post(
  "/",
  auth,
  [
    check("title", "Title is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const { title, experience } = req.body;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        return res.status(400).json({
          errors: [
            { profile: "The profile for the user has already been created." }
          ]
        });
      }
      const user = await User.findById(req.user.id).select("-password");
      let name = user.name;
      profile = new Profile({ title, experience, user });

      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

router.delete("/:id", auth, async (req, res) => {
  try {
    let profile = await Profile.findById(req.params.id);
    if (!profile) {
      return res.status(404).send({
        message: "Profile not found"
      });
    }
    await profile.remove();
    res.json({ message: "Profile was deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

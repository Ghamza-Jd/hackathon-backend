const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/User");

/**
 * @route POST api/users
 * @desc Register a User
 * @access Public
 */
router.post("/", (req, res) => {
  const { first, last, username, phone, email, password } = req.body;
  User.findOne({ username: username }).then(user => {
    if (user) return res.json({ msg: "User already exists" });
    const newUser = new User({
      first: first,
      last: last,
      username: username,
      phone: phone,
      password: password
    });
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(() => res.json("User Registered!"));
      });
    });
  });
});

module.exports = router;

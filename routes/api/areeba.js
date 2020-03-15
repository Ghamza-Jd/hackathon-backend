const express = require("express");
const request = require("request");
const bcrypt = require("bcryptjs");
const router = express.Router();

const User = require("../../models/User");

/**
 * @route POST api/areeba
 * @desc Request token
 * @access Public
 */
router.post("/", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ msg: "Please enter all fields", err: true });
  User.findOne({ username: username }).then(user => {
    if (!user)
      return res.status(400).json({ msg: "User does not exists", err: true });
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch)
        return res.status(400).json({ msg: "Invalid Credentials!", err: true });
      const options = {
        method: "POST",
        url: "https://api.areeba.com/oauth2/token",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic TjJndmVGTUxJTjhEa1I2VVNHZVZtdUV2d2NFYTpQaDRla3pJUmxGWmdJOFVqalFLQnhyc1Y1NW9h"
        },
        form: {
          grant_type: "client_credentials"
        }
      };
      request(options, (err, response) => {
        if (err) throw err;
        res.send(response.toJSON().body);
      });
    });
  });
});

module.exports = router;

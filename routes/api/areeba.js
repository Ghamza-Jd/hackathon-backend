const express = require("express");
const request = require("request");
const router = express.Router();

/**
 * @route POST api/areeba
 * @desc Request token
 * @access Public
 */
router.post("/oauth2/token", (req, res) => {
  console.log(req.headers);
  const options = {
    method: "POST",
    url: "https://api.areeba.com/oauth2/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: req.headers.authorization
    },
    form: {
      grant_type: req.body.grant_type
    }
  };
  request(options, (err, response) => {
    if (err) throw err;
    res.send(response.toJSON().body);
  });
});

module.exports = router;

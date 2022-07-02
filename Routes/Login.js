const express = require("express");
const router = express.Router();
const { loginUser } = require("../Controllers/Controllers");

router.route("/").post(loginUser);

module.exports = router;

const express = require("express");
const router = express.Router();
const { registerNewUser } = require("../Controllers/Controllers");

router.route("/").post(registerNewUser);

module.exports = router;

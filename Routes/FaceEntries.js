const express = require("express");
const router = express.Router();
const { updateFaceEntries } = require("../Controllers/Controllers");

router.route("/facemodel").put(updateFaceEntries);

module.exports = router;

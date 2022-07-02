const express = require("express");
const router = express.Router();
const { updateColorEntries } = require("../Controllers/Controllers");

router.route("/colormodel").put(updateColorEntries);

module.exports = router;

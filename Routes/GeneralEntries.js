const express = require("express");
const router = express.Router();
const { updateGeneralEntries } = require("../Controllers/Controllers");

router.route("/generalmodel").put(updateGeneralEntries);

module.exports = router;

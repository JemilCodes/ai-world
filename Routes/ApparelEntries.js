const express = require("express");
const router = express.Router();
const { updateApparelEntries } = require("../Controllers/Controllers");

router.route("/apparelmodel").put(updateApparelEntries);

module.exports = router;

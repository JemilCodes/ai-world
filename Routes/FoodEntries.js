const express = require("express");
const router = express.Router();
const { updateFoodEntries } = require("../Controllers/Controllers");

router.route("/foodmodel").put(updateFoodEntries);

module.exports = router;

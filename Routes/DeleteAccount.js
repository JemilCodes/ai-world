const express = require("express");
const router = express.Router();
const { DeleteAccount } = require("../Controllers/Controllers");

router.route("/").delete(DeleteAccount);

module.exports = router;

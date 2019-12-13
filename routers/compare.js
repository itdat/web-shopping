const express = require("express");
const router = express.Router();
const compare = require("../controllers/compare");

router.get("/", compare);

module.exports = router;

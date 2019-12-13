const express = require("express");
const router = express.Router();
const history = require("../controllers/history");

router.get("/", history);

module.exports = router;

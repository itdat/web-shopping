const express = require("express");
const router = express.Router();
const aboutUs = require("../controllers/about-us");

router.get("/", aboutUs);

module.exports = router;

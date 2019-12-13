const express = require("express");
const router = express.Router();
const checkout = require("../controllers/checkout");

router.get("/", checkout);

module.exports = router;

const express = require("express");
const router = express.Router();
const wishlist = require("../controllers/wishlist");

router.get("/", wishlist);

module.exports = router;

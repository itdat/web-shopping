const express = require("express");
const router = express.Router();
const shoppingCart = require("../controllers/shopping-cart");

router.get("/", shoppingCart);

module.exports = router;

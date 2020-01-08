const express = require("express");
const router = express.Router();
const cartController = require("../controllers/shopping-cart");

const { isAuthenticated } = require("../controllers/authentication");

router.get("/", cartController.showShoppingCart);

// router.post("/add/:path", addToCart);

// router.post("/force-update", forceUpdate);

module.exports = router;

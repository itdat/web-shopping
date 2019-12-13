const express = require("express");
const router = express.Router();
const { getAllProducts, getSingleProduct } = require("../controllers/product");

router.get("/", getAllProducts);
router.get("/:path", getSingleProduct);

module.exports = router;

const express = require("express");

const index = require("./routers/index");
const products = require("./routers/products");
const aboutUs = require("./routers/about-us");
const checkout = require("./routers/checkout");
const compare = require("./routers/compare");
const contact = require("./routers/contact");
const faq = require("./routers/faq");
const history = require("./routers/history");
const login = require("./routers/login");
const register = require("./routers/register");
const logout = require("./routers/logout");
const shoppingCart = require("./routers/shopping-cart");
const wishlist = require("./routers/wishlist");

const router = express.Router();

router.use("/", index);
router.use("/products", products);
router.use("/about-us", aboutUs);
router.use("/checkout", checkout);
router.use("/compare", compare);
router.use("/contact", contact);
router.use("/faq", faq);
router.use("/history", history);
router.use("/login", login);
router.use("/register", register);
router.use("/logout", logout);
router.use("/shopping-cart", shoppingCart);
router.use("/wishlist", wishlist);

module.exports = router;

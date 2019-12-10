const express = require("express");
const indexController = require("./controllers/index");
const productsController = require("./controllers/products");
const productDetailsController = require("./controllers/product-details");
const registerController = require("./controllers/register");
const logInController = require("./controllers/login");
const logOutController = require("./controllers/logout");
const aboutUsController = require("./controllers/about-us.js");
const contactController = require("./controllers/contact.js");
const checkoutController = require("./controllers/checkout.js");
const shoppingCartController = require("./controllers/shopping-cart.js");
const wishlistController = require("./controllers/wishlist.js");
const historyController = require("./controllers/history.js");
const faqController = require("./controllers/faq.js");
const compareController = require("./controllers/compare.js");

const router = express.Router();

/* GET home page. */
router.use("/", indexController);

/* GET list of products. */
router.use("/products", productsController);

// /* GET a specific product. */
router.get("/products/:path", productDetailsController);

/* GET register page. */
router.use("/register", registerController);

/* GET login page. */
router.use("/login", logInController);

/* GET logout. */
router.use("/logout", logOutController);

/* GET about page. */
router.get("/about-us", aboutUsController);

/* GET contact page. */
router.get("/contact", contactController);

/* GET checkout page. */
router.get("/checkout", checkoutController);

/* GET shopping cart page. */
router.get("/shopping-cart", shoppingCartController);

/* GET wishlist page. */
router.get("/wishlist", wishlistController);

/* GET history page. */
router.get("/history", historyController);

/* GET FAQ page. */
router.get("/faq", faqController);

/* GET compare page. */
router.get("/compare", compareController);

module.exports = router;

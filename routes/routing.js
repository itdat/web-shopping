var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express", layout: "layout-index" });
});
router.get("/index.html", function(req, res, next) {
  res.render("index", { title: "Express", layout: "layout-index" });
});

/* GET about page. */
router.get("/about-us.html", function(req, res, next) {
  res.render("about-us", { title: "About Us" });
});

/* GET contact page. */
router.get("/contact.html", function(req, res, next) {
  res.render("contact", { title: "Contact" });
});

/* GET checkout page. */
router.get("/checkout.html", function(req, res, next) {
  res.render("checkout", { title: "Checkout" });
});

/* GET shopping cart page. */
router.get("/shopping-cart.html", function(req, res, next) {
  res.render("shopping-cart", { title: "View Full Cart" });
});

/* GET wishlist page. */
router.get("/wishlist.html", function(req, res, next) {
  res.render("wishlist", { title: "Wishlist" });
});

/* GET FAQ page. */
router.get("/faq.html", function(req, res, next) {
  res.render("faq", { title: "FAQ" });
});

/* GET login/register page. */
router.get("/login-register.html", function(req, res, next) {
  res.render("login-register", { title: "Login/Register" });
});

/* GET shop 3 columns page. */
router.get("/shop-3-column.html", function(req, res, next) {
  res.render("shop-3-column", { title: "Shop" });
});

/* GET shop 4 columns page. */
router.get("/shop-4-column.html", function(req, res, next) {
  res.render("shop-4-column", { title: "Shop" });
});

/* GET shop left sidebar page. */
router.get("/shop-left-sidebar.html", function(req, res, next) {
  res.render("shop-left-sidebar", { title: "Shop" });
});

/* GET shop right sidebar page. */
router.get("/shop-right-sidebar.html", function(req, res, next) {
  res.render("shop-right-sidebar", { title: "Shop" });
});

/* GET shop list page. */
router.get("/shop-list.html", function(req, res, next) {
  res.render("shop-list", { title: "Shop" });
});

/* GET shop list left sidebar page. */
router.get("/shop-list-left-sidebar.html", function(req, res, next) {
  res.render("shop-list-left-sidebar", { title: "Shop" });
});

/* GET shop list right sidebar page. */
router.get("/shop-list-right-sidebar.html", function(req, res, next) {
  res.render("shop-list-right-sidebar", { title: "Shop" });
});

/* GET single product page. */
router.get("/single-product.html", function(req, res, next) {
  res.render("single-product", { title: "Product" });
});

/* GET single product affiliate page. */
router.get("/single-product-affiliate.html", function(req, res, next) {
  res.render("single-product-affiliate", { title: "Product" });
});

/* GET single product tab style top page. */
router.get("/single-product-tab-style-top.html", function(req, res, next) {
  res.render("single-product-tab-style-top", { title: "Product" });
});

/* GET single product carousel page. */
router.get("/single-product-carousel.html", function(req, res, next) {
  res.render("single-product-carousel", { title: "Product" });
});

/* GET single product gallery left page. */
router.get("/single-product-gallery-left.html", function(req, res, next) {
  res.render("single-product-gallery-left", { title: "Product" });
});

/* GET single product gallery right page. */
router.get("/single-product-gallery-right.html", function(req, res, next) {
  res.render("single-product-gallery-right", { title: "Product" });
});

/* GET single product group page. */
router.get("/single-product-group.html", function(req, res, next) {
  res.render("single-product-group", { title: "Product Group" });
});

/* GET single product normal page. */
router.get("/single-product-normal.html", function(req, res, next) {
  res.render("single-product-normal", { title: "Product Normal" });
});

/* GET single product sale page. */
router.get("/single-product-sale.html", function(req, res, next) {
  res.render("single-product-sale", { title: "Product Sale" });
});

/* GET single product tab style left page. */
router.get("/single-product-tab-style-left.html", function(req, res, next) {
  res.render("single-product-tab-style-left", {
    title: "Product Tab Style Left"
  });
});

/* GET single product tab style right page. */
router.get("/single-product-tab-style-right.html", function(req, res, next) {
  res.render("single-product-tab-style-right", {
    title: "Product Tab Style Right"
  });
});

/* GET compare page. */
router.get("/compare.html", function(req, res, next) {
  res.render("compare", { title: "Compare" });
});

module.exports = router;

var express = require("express");
const pool = require("../models/db-config");
const cardInfo = require("../models/card-info");
const searchParams = require("../models/search-params");

var router = express.Router();

/* GET home page. */
router.get("/", async function(req, res, next) {
  try {
    const newProducts = await pool.query(
      'SELECT name, brand, price, promote, path, rating, "dateRelease" FROM products WHERE (SELECT DATEDIFF(\'day\', "dateRelease"::timestamp, current_date::timestamp)) BETWEEN 0 AND 30 LIMIT 10'
    );
    const highRatingProducts = await pool.query(
      'SELECT name, brand, price, promote, path, rating, "dateRelease" FROM products WHERE rating >= 4 ORDER BY rating DESC LIMIT 10'
    );
    const popularProducts = await pool.query(
      'SELECT pr.name, pr.brand, pr.price, pr.promote, pr.path, pr.rating, "dateRelease" FROM products pr JOIN receipt_details rd ON pr.id = rd.id_product GROUP BY pr.id, pr.name, pr.brand, pr.price, pr.promote, pr.path, pr.rating HAVING SUM(rd.quantity) >= 5 LIMIT 10'
    );
    const appleBrandProducts = await pool.query(
      'SELECT name, brand, price, promote, path, rating, "dateRelease" FROM products WHERE brand = \'Apple\' ORDER BY "dateRelease" DESC LIMIT 10'
    );

    cardInfo.getCardInfo(newProducts);
    cardInfo.getCardInfo(highRatingProducts);
    cardInfo.getCardInfo(popularProducts);
    cardInfo.getCardInfo(appleBrandProducts);

    res.render("index", {
      title: "Trang chủ",
      layout: "layout-index",
      newProducts: newProducts.rows,
      highRatingProducts: highRatingProducts.rows,
      popularProducts: popularProducts.rows,
      appleBrandProducts: appleBrandProducts.rows
    });
  } catch (err) {
    console.log("ERROR MESSAGE:\n" + err.message);
    res.status(500);
    return res.render("error", {
      code: 500,
      title: "Lỗi truy xuất dữ liệu",
      details:
        "Có lỗi xảy ra ở server nên tạm thời yêu cầu không được phản hồi!"
    });
  }
});

/* GET list of products. */
router.get("/products", async function(req, res, next) {
  // Get current URL
  const currentURL = req.protocol + "://" + req.get("host") + req.url;
  const query = searchParams.makeQueryFilterProductsWithParams(currentURL, [
    "brand",
    "price"
  ]);
  try {
    const allProducts = await pool.query(query);

    cardInfo.getCardInfo(allProducts);

    res.status(200);
    return res.render("shop-left-sidebar", {
      title: "Danh sách sản phẩm",
      layout: "layout",
      allProducts: allProducts.rows
    });
  } catch (err) {
    console.log("ERROR MESSAGE:\n" + err.message);
    res.status(500);
    return res.render("error", {
      code: 500,
      title: "Lỗi truy xuất dữ liệu",
      details:
        "Có lỗi xảy ra ở server nên tạm thời yêu cầu không được phản hồi!"
    });
  }
});

// /* GET a specific product. */
router.get("/products/:path", async function(req, res, next) {
  const productDetails = await pool.query(
    "SELECT * FROM products WHERE path = '" + req.params.path + "'"
  );

  const relateProducts = await pool.query(
    'SELECT id, name, brand, price, promote, path, rating, "dateRelease" FROM products WHERE brand = \'' +
      productDetails.rows[0].brand +
      "'"
  );

  cardInfo.getCardInfo(relateProducts);
  cardInfo.getCardInfo(productDetails);

  console.log(productDetails.rows);
  res.render("single-product", {
    title: productDetails.rows[0].name,
    layout: "layout",
    productDetails: productDetails.rows[0],
    relateProducts: relateProducts.rows
  });
});

/* GET about page. */
router.get("/about-us.html", function(req, res, next) {
  res.render("about-us", { title: "Thông tin" });
});

/* GET contact page. */
router.get("/contact.html", function(req, res, next) {
  res.render("contact", { title: "Liên hệ" });
});

/* GET checkout page. */
router.get("/checkout.html", function(req, res, next) {
  res.render("checkout", { title: "Phương thức thanh toán" });
});

/* GET shopping cart page. */
router.get("/shopping-cart.html", function(req, res, next) {
  res.render("shopping-cart", { title: "Xem giỏ hàng" });
});

/* GET wishlist page. */
router.get("/wishlist.html", function(req, res, next) {
  res.render("wishlist", { title: "Danh sách yêu thích" });
});

/* GET history page. */
router.get("/history.html", function(req, res, next) {
  res.render("history", { title: "Lịch sử giao dịch" });
});

/* GET FAQ page. */
router.get("/faq.html", function(req, res, next) {
  res.render("faq", { title: "Câu hỏi thường gặp" });
});

/* GET login/register page. */
router.get("/login-register.html", function(req, res, next) {
  res.render("login-register", { title: "Đăng nhập / Đăng ký" });
});

/* GET compare page. */
router.get("/compare.html", function(req, res, next) {
  res.render("compare", { title: "So sánh sản phẩm" });
});

module.exports = router;

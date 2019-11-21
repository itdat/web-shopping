var express = require("express");
var router = express.Router();

const pool = require("../db-config");

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

/* GET home page. */
router.get("/", async function(req, res, next) {
  const newProducts = await pool.query(
    'SELECT name, brand, price, promote, images, rating, "dateRelease" FROM products WHERE (SELECT DATEDIFF(\'day\', "dateRelease"::timestamp, current_date::timestamp)) BETWEEN 0 AND 30 LIMIT 10'
  );
  const highRatingProducts = await pool.query(
    'SELECT name, brand, price, promote, images, rating, "dateRelease" FROM products WHERE rating >= 4 ORDER BY rating DESC LIMIT 10'
  );
  const popularProducts = await pool.query(
    'SELECT pr.name, pr.brand, pr.price, pr.promote, pr.images, pr.rating, "dateRelease" FROM products pr JOIN receipt_details rd ON pr.id = rd.id_product GROUP BY pr.id, pr.name, pr.brand, pr.price, pr.promote, pr.images, pr.rating HAVING SUM(rd.quantity) >= 5 LIMIT 10'
  );
  const appleBrandProducts = await pool.query(
    'SELECT name, brand, price, promote, images, rating, "dateRelease" FROM products WHERE brand = \'Apple\' ORDER BY "dateRelease" DESC LIMIT 10'
  );

  const cardInfo = require("../card-info");

  cardInfo.getCardInfo(newProducts);
  cardInfo.getCardInfo(highRatingProducts);
  cardInfo.getCardInfo(popularProducts);
  cardInfo.getCardInfo(appleBrandProducts);

  console.log(newProducts.rows);
  res.render("index", {
    title: "Trang chủ",
    layout: "layout-index",
    newProducts: newProducts.rows,
    highRatingProducts: highRatingProducts.rows,
    popularProducts: popularProducts.rows,
    appleBrandProducts: appleBrandProducts.rows
  });
});

router.get("/index.html", async function(req, res, next) {
  const newProducts = await pool.query(
    'SELECT id, name, brand, price, promote, images, rating, "dateRelease" FROM products WHERE (SELECT DATEDIFF(\'day\', "dateRelease"::timestamp, current_date::timestamp)) BETWEEN 0 AND 30 LIMIT 10'
  );
  const highRatingProducts = await pool.query(
    'SELECT id, name, brand, price, promote, images, rating, "dateRelease" FROM products WHERE rating >= 4 ORDER BY rating DESC LIMIT 10'
  );
  const popularProducts = await pool.query(
    'SELECT pr.id, pr.name, pr.brand, pr.price, pr.promote, pr.images, pr.rating, "dateRelease" FROM products pr JOIN receipt_details rd ON pr.id = rd.id_product GROUP BY pr.id, pr.name, pr.brand, pr.price, pr.promote, pr.images, pr.rating HAVING SUM(rd.quantity) >= 5 LIMIT 10'
  );
  const appleBrandProducts = await pool.query(
    'SELECT id, name, brand, price, promote, images, rating, "dateRelease" FROM products WHERE brand = \'Apple\' ORDER BY "dateRelease" DESC LIMIT 10'
  );

  const cardInfo = require("../card-info");

  cardInfo.getCardInfo(newProducts);
  cardInfo.getCardInfo(highRatingProducts);
  cardInfo.getCardInfo(popularProducts);
  cardInfo.getCardInfo(appleBrandProducts);

  console.log(newProducts.rows);
  res.render("index", {
    title: "Trang chủ",
    layout: "layout-index",
    newProducts: newProducts.rows,
    highRatingProducts: highRatingProducts.rows,
    popularProducts: popularProducts.rows,
    appleBrandProducts: appleBrandProducts.rows
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

/* GET shop left sidebar page. */
router.get("/products", async function(req, res, next) {
  const currentURL = new URL(req.protocol + "://" + req.get("host") + req.url);
  const queryMap = {
    "2000000": "(price::money::numeric::float8 < 2000000)",
    "2000000-4000000":
      "(price::money::numeric::float8 BETWEEN 2000000 AND 4000000)",
    "4000000-7000000":
      "(price::money::numeric::float8 BETWEEN 4000000 AND 7000000)",
    "7000000-13000000":
      "(price::money::numeric::float8 BETWEEN 7000000 AND 13000000)",
    "13000000": "(price::money::numeric::float8 > 13000000)"
  };

  let brandSelected = currentURL.searchParams.getAll("brand");
  let priceSelected = currentURL.searchParams.getAll("price");

  console.log(brandSelected);
  console.log(priceSelected.length);

  let query =
    'SELECT id, name, brand, price, promote, images, rating, "dateRelease", description FROM products';

  let brandQuery = "",
    priceQuery = "";
  if (brandSelected.length != 0) {
    brandQuery = "(";
    brandSelected.forEach((b, i) => {
      brandQuery = brandQuery + "(brand = '" + b + "')";
      if (i != brandSelected.length - 1) {
        brandQuery += " OR ";
      } else {
        brandQuery += ")";
      }
    });
  }

  if (priceSelected.length != 0) {
    priceQuery = "(";
    priceSelected.forEach((b, i) => {
      priceQuery = priceQuery + queryMap[b];
      if (i != priceSelected.length - 1) {
        priceQuery += " OR ";
      } else {
        priceQuery += ")";
      }
    });
  }

  if (brandQuery !== "" || priceQuery !== "") query += " WHERE ";
  query += brandQuery;
  if (brandQuery !== "" && priceQuery !== "") query += " AND ";
  query += priceQuery;
  console.log(query);

  const allProducts = await pool.query(query);

  const cardInfo = require("../card-info");

  cardInfo.getCardInfo(allProducts);

  console.log(allProducts.rows);
  res.render("shop-left-sidebar", {
    title: "Danh sách sản phẩm",
    layout: "layout",
    allProducts: allProducts.rows
  });
});

/* GET BY BRAND */
router.get("/brand/:brand", async function(req, res, next) {
  const allProducts = await pool.query(
    'SELECT id, name, brand, price, promote, images, rating, "dateRelease" FROM products WHERE brand =\'' +
      req.params.brand +
      "'"
  );

  const cardInfo = require("../card-info");

  cardInfo.getCardInfo(allProducts);

  console.log(allProducts.rows);
  res.render("shop-left-sidebar", {
    title: "Danh sách sản phẩm",
    layout: "layout",
    allProducts: allProducts.rows
  });
});

/* GET single product page. */
router.get("/single-product-:id", async function(req, res, next) {
  const productDetails = await pool.query(
    "SELECT * FROM products WHERE id = " + req.params.id
  );

  const relateProducts = await pool.query(
    'SELECT id, name, brand, price, promote, images, rating, "dateRelease" FROM products WHERE brand = \'' +
      productDetails.rows[0].brand +
      "'"
  );

  const cardInfo = require("../card-info");

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

/* GET compare page. */
router.get("/compare.html", function(req, res, next) {
  res.render("compare", { title: "So sánh sản phẩm" });
});

module.exports = router;

const products = require("../models/product");

module.exports = async (req, res) => {
  try {
    // Get data from database
    const newProducts = await products.getTop10NewProducts();
    const bestsellerProducts = await products.getTop10BestSellerProducts();
    const highRatingProducts = await products.getTop10HighRatingProducts();
    const appleBrandProducts = await products.getTop10AppleProducts();

    // Create view model
    let viewModel = {
      title: "Trang chủ",
      layout: "layout-index",
      newProducts: newProducts,
      highRatingProducts: highRatingProducts,
      bestsellerProducts: bestsellerProducts,
      appleBrandProducts: appleBrandProducts
    };

    // Response
    res.status(200);
    res.render("index", viewModel);
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
};

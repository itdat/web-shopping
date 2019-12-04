const products = require("../models/products");
module.exports = async function(req, res, next) {
  try {
    const productDetails = await products.getProductDetails(req.params.path);
    const relateProducts = await products.getProductsByBrand(
      productDetails.brand
    );

    res.status(200);
    res.render("single-product", {
      title: productDetails.name,
      layout: "layout",
      headerTop: function() {
        if (req.isAuthenticated()) {
          return "headerTopAuthenticated";
        } else {
          return "headerTopUnauthenticated";
        }
      },
      firstName: function() {
        if (!req.user) {
          return null;
        } else {
          if (req.user.firtsName) {
            return req.user.firtsName;
          } else {
            return req.user.email;
          }
        }
      },
      productDetails: productDetails,
      relateProducts: relateProducts
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
};

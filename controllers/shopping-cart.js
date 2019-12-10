module.exports = function(req, res, next) {
  res.render("shopping-cart", {
    title: "Xem giỏ hàng",
    headerTop: function() {
      if (req.isAuthenticated()) {
        return "headerTopAuthenticated";
      } else {
        return "headerTopUnauthenticated";
      }
    },
    error: req.flash("error")
  });
};

module.exports = function(req, res, next) {
  res.render("compare", {
    title: "So sánh sản phẩm",
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

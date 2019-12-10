module.exports = function(req, res, next) {
  res.render("checkout", {
    title: "Phương thức thanh toán",
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

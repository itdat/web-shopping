module.exports = function(req, res, next) {
  res.render("wishlist", {
    title: "Danh sách yêu thích",
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

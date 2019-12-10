module.exports = function(req, res, next) {
  res.render("history", {
    title: "Lịch sử giao dịch",
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

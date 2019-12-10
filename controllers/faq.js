module.exports = function(req, res, next) {
  res.render("faq", {
    title: "Câu hỏi thường gặp",
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

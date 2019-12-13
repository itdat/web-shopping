const passport = require("passport");

module.exports.showRegisterPage = (req, res) => {
  res.render("register", {
    title: "Đăng ký",
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

module.exports.registerUser = passport.authenticate("local.register", {
  successRedirect: "/login",
  failureRedirect: "/register",
  failureFlash: true
});

module.exports.showLoginPage = (req, res) => {
  res.render("login", {
    title: "Đăng nhập",
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

module.exports.loginUser = passport.authenticate("local.login", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true
});

module.exports.logoutUser = (req, res) => {
  req.logout();
  res.redirect("/");
};

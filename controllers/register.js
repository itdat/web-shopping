const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get(
  "/",
  function(req, res, next) {
    if (req.isUnauthenticated()) return next();
    else res.redirect("/");
  },
  function(req, res) {
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
  }
);

router.post(
  "/",
  passport.authenticate("local.register", {
    successRedirect: "/login",
    failureRedirect: "/register",
    failureFlash: true
  })
);

module.exports = router;

const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get(
  "/",
  function(req, res, next) {
    if (req.isUnauthenticated()) return next();
    else res.redirect("back");
  },
  function(req, res) {
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
  }
);

router.post(
  "/",
  passport.authenticate("local.login", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
  })
);

module.exports = router;

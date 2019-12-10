const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get(
  "/",
  function(req, res, next) {
    if (req.isAuthenticated()) return next();
    else res.redirect("back");
  },
  function(req, res) {
    req.logout();
    res.redirect("/");
  }
);

module.exports = router;

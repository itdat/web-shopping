const express = require("express");
const router = express.Router();
const { logoutUser } = require("../controllers/user");
const { isAuthenticated } = require("../controllers/authentication");

router.get("/", isAuthenticated, logoutUser);

module.exports = router;

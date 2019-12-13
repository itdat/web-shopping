const express = require("express");
const router = express.Router();
const { showLoginPage, loginUser } = require("../controllers/user");
const { isUnauthenticated } = require("../controllers/authentication");

router.get("/", isUnauthenticated, showLoginPage);
router.post("/", isUnauthenticated, loginUser);

module.exports = router;

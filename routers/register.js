const express = require("express");
const router = express.Router();
const { showRegisterPage, registerUser } = require("../controllers/user");
const { isUnauthenticated } = require("../controllers/authentication");

router.get("/", isUnauthenticated, showRegisterPage);
router.post("/", isUnauthenticated, registerUser);

module.exports = router;

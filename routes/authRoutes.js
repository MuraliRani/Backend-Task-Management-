const express = require("express");
const router = express.Router();
const { signup, login , logout } = require("../controllers/authControllers");

// Routes beginning with /api/auth
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);



// router.post("/logout", logout);

module.exports = router;

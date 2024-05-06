const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/api/users");
// const usersCtrl = require('../../controllers/api/users');
const ensuredLoggedIn = require("../../config/ensuredLoggedIn");

// All paths start with '/api/users'
router.get("/quiz-data", usersCtrl.getQuizzes);
router.get("/score-data", usersCtrl.getScore);
router.get("/user-rank", usersCtrl.getRank);

// GET /api/users/check-token
router.get("/check-token", usersCtrl.checkToken);

// POST /api/users (create a user - sign up)
router.post("/", usersCtrl.create);

// POST /api/users/login
router.post("/login", usersCtrl.login);

module.exports = router;

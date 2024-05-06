const express = require("express");
const router = express.Router();
const quizCtrl = require("../../controllers/api/quiz");

//all routes start with /api/flash-card
router.post("/save", quizCtrl.save);

module.exports = router;

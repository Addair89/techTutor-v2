const express = require("express");
const router = express.Router();
const questionsCtrl = require("../../controllers/api/questions");

//all routes start with /api/questions
router.get("/all-categories", questionsCtrl.allCategories);
router.get("/cat-difficulties/:cat", questionsCtrl.catDifficulties);
router.get("/detail/:questionId", questionsCtrl.questionDetails);
router.get("/:cat/:diff", questionsCtrl.getQuestions);

module.exports = router;

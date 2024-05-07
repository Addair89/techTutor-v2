const express = require("express");
const router = express.Router();
const flashCardCtrl = require("../../controllers/api/flashCard");

//all routes start with /api/flash-card
router.post("/add-user-card", flashCardCtrl.addUserCard);
router.post("/add", flashCardCtrl.add);
router.post("/update-user-card", flashCardCtrl.updateUserCard);
router.get("/get/:userId", flashCardCtrl.getAll);
router.get("/get-user-cards/:userId", flashCardCtrl.getUserCards);
router.delete("/remove-user-card/:cardId", flashCardCtrl.deleteOneUserCard);
router.delete("/delete/:question/:user", flashCardCtrl.deleteOne);

module.exports = router;

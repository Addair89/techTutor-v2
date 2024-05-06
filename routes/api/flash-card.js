const express = require("express");
const router = express.Router();
const flashCardCtrl = require("../../controllers/api/flashCard");

//all routes start with /api/flash-card
router.post("/add-user-card", flashCardCtrl.addUserCard);
router.post("/add", flashCardCtrl.add);
router.get("/get/:userId", flashCardCtrl.getAll);
router.delete("/delete/:question/:user", flashCardCtrl.deleteOne);

module.exports = router;

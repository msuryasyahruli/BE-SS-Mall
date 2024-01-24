const express = require("express");
const router = express.Router();
const historyController = require("../controller/history");

router
  .get("/", historyController.getAllHistory)
  .post("/", historyController.createHistory)
  .delete("/:id", historyController.deleteHistory);

module.exports = router;

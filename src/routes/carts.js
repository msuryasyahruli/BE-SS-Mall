const express = require("express");
const router = express.Router();
const cartController = require("../controller/carts");

router
  .get("/", cartController.getAllCart)
  .post("/", cartController.createCart)
  .delete("/:id", cartController.deleteCart);

module.exports = router;

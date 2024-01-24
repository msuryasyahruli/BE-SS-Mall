const express = require("express");
const router = express.Router();
const productsController = require("../controller/products");
const upload = require("../middleware/upload");

router
  .get("/", productsController.getAllProduct)
  .get("/:id", productsController.getDetailProduct)
  .post("/", upload, productsController.createProduct)
  .put("/:id", upload, productsController.updateProduct)
  .delete("/:id", productsController.deleteProduct);

module.exports = router;

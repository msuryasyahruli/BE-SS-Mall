const express = require("express");
const router = express.Router();
const productRouter = require("./products");
const cartRouter = require("./carts");
const historyRouter = require("./history");

router.use("/product", productRouter);
router.use("/cart", cartRouter);
router.use("/history", historyRouter);

module.exports = router;

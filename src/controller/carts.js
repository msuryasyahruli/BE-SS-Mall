const {
  selectAllCart,
  insertCart,
  deleteCart,
  findId,
} = require("../model/carts");
const commonHelper = require("../helper/common");
const { v4: uuidv4 } = require("uuid");

const cartController = {
  getAllCart: async (req, res) => {
    try {
      const result = await selectAllCart();
      commonHelper.response(
        res,
        result.rows,
        200,
        "get data success"
      );
    } catch (error) {
      console.log(error);
    }
  },

  createCart: async (req, res) => {
    const { product_id } = req.body;
    const cart_id = uuidv4();
    const data = {
      cart_id,
      product_id,
    };
    insertCart(data)
      .then((result) =>
        commonHelper.response(res, result.rows, 201, "Product created")
      )
      .catch((err) => res.send(err));
  },

  deleteCart: async (req, res) => {
    try {
      const cart_id = String(req.params.id);
      const { rowCount } = await findId(cart_id);
      if (!rowCount) {
        res.json({ message: "ID is Not Found" });
      }
      deleteCart(cart_id)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Product deleted")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = cartController;

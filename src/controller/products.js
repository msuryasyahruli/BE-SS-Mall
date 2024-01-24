const {
  selectAllProduct,
  selectProduct,
  insertProduct,
  updateProduct,
  deleteProduct,
  countData,
  findId,
} = require("../model/products");
const commonHelper = require("../helper/common");
const { v4: uuidv4 } = require("uuid");
const cloudinary = require("../middleware/cloudinary");

const productsController = {
  getAllProduct: async (req, res) => {
    try {
      const result = await selectAllProduct();
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

  getDetailProduct: async (req, res) => {
    const product_id = String(req.params.id);
    const { rowCount } = await findId(product_id);
    if (!rowCount) {
      return res.json({ message: "ID Not Found" });
    }
    selectProduct(product_id)
      .then((result) => {
        commonHelper.response(
          res,
          result.rows,
          200,
          "get data success from database"
        );
      })
      .catch((err) => res.send(err));
  },

  createProduct: async (req, res) => {
    const result = await cloudinary.uploader.upload(req.file.path);
    const product_image = result.secure_url;
    const { product_name, product_price } = req.body;
    const product_id = uuidv4();
    const data = {
      product_id,
      product_name,
      product_image,
      product_price,
    };
    insertProduct(data)
      .then((result) =>
        commonHelper.response(res, result.rows, 201, "Product created")
      )
      .catch((err) => res.send(err));
  },

  updateProduct: async (req, res) => {
    try {
      const product_id = String(req.params.id);
      const result = await cloudinary.uploader.upload(req.file.path);
      const product_image = result.secure_url;
      const { product_name, product_price } = req.body;
      const { rowCount } = await findId(product_id);
      if (!rowCount) {
        res.json({ message: "ID is Not Found" });
      }
      const data = {
        product_id,
        product_name,
        product_image,
        product_price,
      };
      updateProduct(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Product updated")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const product_id = String(req.params.id);
      const { rowCount } = await findId(product_id);
      if (!rowCount) {
        res.json({ message: "ID is Not Found" });
      }
      deleteProduct(product_id)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Product deleted")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = productsController;

const Pool = require("../config/db");

const selectAllProduct = () => {
  return Pool.query(
    `SELECT * FROM products`
  );
};

const selectProduct = (product_id) => {
  return Pool.query(`SELECT * FROM products WHERE product_id='${product_id}'`);
};

const insertProduct = (data) => {
  const { product_id, product_name, product_image, product_price } = data;
  return Pool.query(
    `INSERT INTO products(product_id,product_name,product_image,product_price) VALUES('${product_id}','${product_name}','${product_image}','${product_price}')`
  );
};

const updateProduct = (data) => {
  const { product_id, product_name, product_image, product_price } = data;
  return Pool.query(
    `UPDATE products SET product_name='${product_name}', product_image='${product_image}', product_price='${product_price}' WHERE product_id='${product_id}'`
  );
};

const deleteProduct = (product_id) => {
  return Pool.query(`DELETE FROM products WHERE product_id='${product_id}'`);
};

const countData = () => {
  return Pool.query("SELECT COUNT(*) FROM products");
};

const findId = (product_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT product_id FROM products WHERE product_id='${product_id}'`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

module.exports = {
  selectAllProduct,
  selectProduct,
  insertProduct,
  updateProduct,
  deleteProduct,
  countData,
  findId,
};

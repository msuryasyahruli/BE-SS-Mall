const Pool = require("../config/db");

const selectAllCart = () => {
  return Pool.query(
    `SELECT * FROM cart`
  );
};

const insertCart = (data) => {
  const { cart_id, product_id } = data;
  return Pool.query(
    `INSERT INTO cart(cart_id,product_id) VALUES('${cart_id}','${product_id}')`
  );
};

const deleteCart = (cart_id) => {
  return Pool.query(`DELETE FROM cart WHERE cart_id='${cart_id}'`);
};

const findId = (cart_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT cart_id FROM cart WHERE cart_id='${cart_id}'`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

module.exports = {
  selectAllCart,
  insertCart,
  deleteCart,
  findId,
};

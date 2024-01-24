const Pool = require("../config/db");

const selectAllHistory = () => {
  return Pool.query(
    `SELECT * FROM history`
  );
};

const insertHistory = (data) => {
  const { history_id, product_id } = data;
  return Pool.query(
    `INSERT INTO history(history_id,product_id) VALUES('${history_id}','${product_id}')`
  );
};

const deleteHistory = (history_id) => {
  return Pool.query(`DELETE FROM history WHERE history_id='${history_id}'`);
};

const findId = (history_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT history_id FROM history WHERE history_id='${history_id}'`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

module.exports = {
  selectAllHistory,
  insertHistory,
  deleteHistory,
  findId,
};

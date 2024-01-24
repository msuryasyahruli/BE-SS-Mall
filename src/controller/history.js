const {
    selectAllHistory,
    insertHistory,
    deleteHistory,
    findId,
} = require("../model/history");
const commonHelper = require("../helper/common");
const { v4: uuidv4 } = require("uuid");

const historyController = {
    getAllHistory: async (req, res) => {
        try {
            const result = await selectAllHistory();
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

    createHistory: async (req, res) => {
        const { product_id } = req.body;
        const history_id = uuidv4();
        const data = {
            history_id,
            product_id,
        };
        insertHistory(data)
            .then((result) =>
                commonHelper.response(res, result.rows, 201, "Product created")
            )
            .catch((err) => res.send(err));
    },

    deleteHistory: async (req, res) => {
        try {
            const history_id = String(req.params.id);
            const { rowCount } = await findId(history_id);
            if (!rowCount) {
                res.json({ message: "ID is Not Found" });
            }
            deleteHistory(history_id)
                .then((result) =>
                    commonHelper.response(res, result.rows, 200, "Product deleted")
                )
                .catch((err) => res.send(err));
        } catch (error) {
            console.log(error);
        }
    },
};

module.exports = historyController;

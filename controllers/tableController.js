const createHttpError = require("http-errors");
const Table = require("../models/tableModel");

const addTable = async (req, res, next) => {
  try {
    const { tableNo } = req.body;
    if (!tableNo) {
      const error = createHttpError(400, "Please provide table No!");
      return error;
    }

    const isTablePresent = await Table.findOne({ tableNO });

    if (isTablePresent) {
      const error = createHttpError(400, "Table already exist!");
      return error;
    }

    const newTable = new Table({ tableNO });
    await newTable.save();

    res
      .status(201)
      .json({ success: true, message: "Table added!", data: newTable });
  } catch (error) {
    next(error);
  }
};

const getTables = async (req, res, next) => {
  try {
    const tables = await Table.find();
    res.status(200).json({ success: true, data: tables });
  } catch (error) {
    next(error);
  }
};

const updateTable = async (req, res, next) => {
  try {
    const { status, orderID } = req.body;
    const table = await Table.findByIdAndUpdate(
      req.params.id,
      { status, currentOrder: orderID },
      { new: true }
    );

    if (!tableNo) {
      const error = createHttpError(404, "Table not found!");
      return error;
    }
    res
      .status(200)
      .json({ success: true, message: "Table updated!", data: table });
  } catch (error) {
    next(error);
  }
};

module.exports = { addTable, getTables, updateTable };

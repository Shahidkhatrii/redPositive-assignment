const asyncHandler = require("express-async-handler");
const Form = require("../models/formModel");

const getTableData = asyncHandler(async (req, res) => {
  try {
    const tableData = await Form.find();
    res.json(tableData).status(200);
  } catch (error) {
    console.log(error?.message);
  }
});

const createRow = asyncHandler(async (req, res) => {
  const { username, phone, email, hobbies } = req.body;
  if (!username || !phone || !email || !hobbies) {
    res.status(400);
    throw new Error("All fields are required!");
  }
  const user = await Form.findOne({ email });
  if (user) {
    res.status(403);
    throw new Error("Email address already exist");
  }
  try {
    const response = await Form.create({ username, phone, email, hobbies });
    res.json(response).status(200);
  } catch (error) {
    console.log(error?.message);
  }
});

const updateRow = asyncHandler(async (req, res) => {
  console.log(req.query.id, "hiiii");
  const row = await Form.findById(req.query.id);
  if (!row) {
    res.status(404);
    throw new Error("data not found");
  }
  try {
    const updatedRow = await Form.findByIdAndUpdate(req.query.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedRow);
  } catch (error) {
    console.log(error?.message);
  }
});

const deleteRow = asyncHandler(async (req, res) => {
  const row = await Form.findById(req.query.id);
  if (!row) {
    res.status(404);
    throw new Error("data not found");
  }
  try {
    await Form.deleteOne({ _id: req.query.id });
    res.status(200).json(row);
  } catch (error) {
    console.log(error?.message);
  }
});

module.exports = { getTableData, createRow, updateRow, deleteRow };

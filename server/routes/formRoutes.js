const express = require("express");
const router = express.Router();
const {
  getTableData,
  createRow,
  updateRow,
  deleteRow,
} = require("../controllers/formController");

router.get("/", getTableData);
router.post("/createRow", createRow);
router.put("/updateRow", updateRow);
router.delete("/deleteRow", deleteRow);
module.exports = router;

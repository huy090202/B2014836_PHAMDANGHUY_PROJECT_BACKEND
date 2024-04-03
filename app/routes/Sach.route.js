const express = require("express");
const router = express.Router();
const SachController = require("../controllers/Sach.controller");

router.post("/add", SachController.addSach);

router.put("/update/:MaSach", SachController.updateSach);

router.get("/detail", SachController.detailSach);

router.get("/all", SachController.getAllSach);

module.exports = router;

const express = require("express");
const router = express.Router();
const NhaXuatBanController = require("../controllers/NhaXuatBan.controller");

router.post("/create", NhaXuatBanController.createNXB);

router.put("/update/:MaNXB", NhaXuatBanController.updateNXB);

router.get("/detail/:MaNXB", NhaXuatBanController.detailNXB);

router.get("/allNXB", NhaXuatBanController.getAllNXB);

module.exports = router;

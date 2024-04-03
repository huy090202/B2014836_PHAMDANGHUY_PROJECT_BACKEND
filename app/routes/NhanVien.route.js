const express = require("express");
const router = express.Router();
const NhanVienController = require("../controllers/NhanVien.controller");

router.post("/signUp", NhanVienController.signUp);

router.post("/signIn", NhanVienController.signIn);

router.get("/logOut", NhanVienController.logOut);

router.put("/update/:MSNV", NhanVienController.updateRoleNV);

router.delete("/delete/:MaSo", NhanVienController.deleteByMaSo);

router.get("/allNV", NhanVienController.getAllNV);

module.exports = router;

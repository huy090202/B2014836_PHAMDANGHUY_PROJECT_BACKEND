const express = require("express");
const router = express.Router();
const DocGiaController = require("../controllers/DocGia.controller");

router.post("/signUp", DocGiaController.signUp);

router.post("/signIn", DocGiaController.signIn);

router.get("/logOut", DocGiaController.logOut);

router.put("/update/:MaDocGia", DocGiaController.updateDG);

router.get("/detailDG/:MaDocGia", DocGiaController.detailDG);

router.get("/allDG", DocGiaController.getAllDG);

module.exports = router;

const express = require("express");
const router = express.Router();
const TheoDoiMuonSachController = require("../controllers/TheoDoiMuonSach.controller");

router.post("/create", TheoDoiMuonSachController.createTDMS);

router.put("/update/:MaTDMS", TheoDoiMuonSachController.updateTDMS);

router.get("/detailTDMS", TheoDoiMuonSachController.detailTDMS);

router.get("/allTDMS", TheoDoiMuonSachController.getAllTDMS);

module.exports = router;

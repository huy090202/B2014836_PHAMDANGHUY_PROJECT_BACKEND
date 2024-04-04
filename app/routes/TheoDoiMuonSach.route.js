const express = require("express");
const router = express.Router();
const TheoDoiMuonSachController = require("../controllers/TheoDoiMuonSach.controller");

router.post("/createTDMS", TheoDoiMuonSachController.createTDMS);

router.put("/updateTDMS", TheoDoiMuonSachController.updateTDMS);

router.get("/detailTDMS", TheoDoiMuonSachController.detailTDMS);

router.get("/getAllTDMS", TheoDoiMuonSachController.getAllTDMS);

module.exports = router;

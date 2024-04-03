const TheoDoiMuonSachService = require("../services/TheoDoiMuonSach.service");

// Tạo mới một theo dõi mượn sách
const createTDMS = async (req, res) => {
  try {
    const response = await TheoDoiMuonSachService.createTDMS(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ message: "Ngày trả sách phải sau ngày mượn sách" });
  }
};

// Cập nhật thông tin theo dõi mượn sách
const updateTDMS = async (req, res) => {
  try {
    const { MaTDMS } = req.params;
    const { NgayTra } = req.body;

    if (!MaTDMS) {
      return res.status(200).json({
        status: "ERROR",
        message: "Mã theo dõi mượn sách không được để trống",
      });
    }

    const response = await TheoDoiMuonSachService.updateTDMS(MaTDMS, NgayTra);

    if (response.status === "OK") {
      return res.status(200).json(response);
    } else {
      return res.status(404).json({
        status: "ERROR",
        message: response.message,
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Lỗi phía máy chủ" });
  }
};

// Chi tiết theo dõi mượn sách
const detailTDMS = async (req, res) => {
  try {
    const maTDMS = req.query.MaTDMS;
    if (!maTDMS) {
      return res.status(200).json({
        status: "ERROR",
        message: "Mã theo dõi mượn sách không được để trống",
      });
    }

    const response = await TheoDoiMuonSachService.detailTDMS(maTDMS);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Lỗi phía máy chủ" });
  }
};

// Lấy danh sách theo dõi mượn sách
const getAllTDMS = async (req, res) => {
  try {
    const maTDMS = req.query.MaTDMS;
    if (!maTDMS) {
      return res.status(200).json({
        status: "ERROR",
        message: "Mã theo dõi mượn sách không được để trống",
        getAllTDMS: [],
      });
    }

    const response = await TheoDoiMuonSachService.getAllTDMS(maTDMS);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Lỗi phía máy chủ" });
  }
};

module.exports = { createTDMS, updateTDMS, detailTDMS, getAllTDMS };

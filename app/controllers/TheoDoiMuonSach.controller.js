const TheoDoiMuonSachService = require("../services/TheoDoiMuonSach.service");

// Tạo mới một theo dõi mượn sách
const createTDMS = async (req, res) => {
  try {
    const response = await TheoDoiMuonSachService.createTDMS(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Lỗi phía máy chủ" });
  }
};

// Cập nhật thông tin theo dõi mượn sách
const updateTDMS = async (req, res) => {
  try {
    const { MaDocGia, MaSach, NgayMuon } = req.query;
    const { TrangThai } = req.body;

    if (!MaDocGia || !MaSach || !NgayMuon) {
      return res.status(200).json({
        status: "ERROR",
        message: "Mã độc giả, mã sách và ngày mượn không được để trống",
      });
    }

    const response = await TheoDoiMuonSachService.updateTDMS(
      MaDocGia,
      MaSach,
      NgayMuon,
      TrangThai
    );

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
    const { MaDocGia, MaSach, NgayMuon } = req.query;

    if (!MaDocGia || !MaSach) {
      return res.status(200).json({
        status: "ERROR",
        message: "Mã độc giả, mã sách và ngày mượn không được để trống",
      });
    }

    const response = await TheoDoiMuonSachService.detailTDMS(
      MaDocGia,
      MaSach,
      NgayMuon
    );
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Lỗi phía máy chủ" });
  }
};

// Lấy danh sách theo dõi mượn sách
const getAllTDMS = async (req, res) => {
  try {
    const { MaDocGia, MaSach, NgayMuon } = req.query;

    if (!MaDocGia && !MaSach && !NgayMuon) {
      return res.status(200).json({
        status: "ERROR",
        message: "Mã độc giả hoặc mã sách hoặc ngày mượn không được để trống",
        getAllTDMS: [],
      });
    }

    const response = await TheoDoiMuonSachService.getAllTDMS(
      MaDocGia,
      MaSach,
      NgayMuon
    );
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Lỗi phía máy chủ" });
  }
};

module.exports = { createTDMS, updateTDMS, detailTDMS, getAllTDMS };

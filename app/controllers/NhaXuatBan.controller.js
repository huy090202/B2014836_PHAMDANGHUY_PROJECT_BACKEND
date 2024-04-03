const NhaXuatBanService = require("../services/NhaXuatBan.service");

// Tạo mới nhà xuất bản
const createNXB = async (req, res) => {
  try {
    const { TenNXB } = req.body;

    if (!TenNXB) {
      return res.status(400).json({
        status: "ERROR",
        message: "Tên nhà xuất bản không được để trống",
      });
    }

    const response = await NhaXuatBanService.createNXB(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Lỗi phía máy chủ" });
  }
};

// Cập nhật thông tin nhà xuất bản
const updateNXB = async (req, res) => {
  try {
    const { MaNXB } = req.params;
    const data = req.body;

    if (!MaNXB) {
      return res.status(400).json({
        status: "ERROR",
        message: "Mã nhà xuất bản không được để trống",
      });
    }

    const response = await NhaXuatBanService.updateNXB(MaNXB, data);
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
    res.status(500).json({ message: "Lỗi phía máy chủ" });
  }
};

// Lấy danh sách nhà xuất bản
const getAllNXB = async (req, res) => {
  try {
    const maNXB = req.query.MaNXB;
    if (!maNXB) {
      return res.status(200).json({
        status: "ERROR",
        message: "Mã nhà xuất bản không được để trống",
        getAllNXB: [],
      });
    }

    const response = await NhaXuatBanService.getAllNXB(maNXB);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Lỗi phía máy chủ" });
  }
};

module.exports = { createNXB, updateNXB, getAllNXB };

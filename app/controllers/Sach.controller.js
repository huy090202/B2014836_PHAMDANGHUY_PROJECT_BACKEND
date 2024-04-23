const SachService = require("../services/Sach.service");

// Thêm sách
const addSach = async (req, res) => {
  try {
    const response = await SachService.addSach(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Lỗi phía máy chủ" });
  }
};

// Cập nhật thông tin sách
const updateSach = async (req, res) => {
  try {
    const { MaSach } = req.params;
    const data = req.body;

    if (!MaSach) {
      return res.status(200).json({
        status: "ERROR",
        message: "Mã sách không được để trống",
      });
    }

    const response = await SachService.updateSach(MaSach, data);

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

// Chi tiết sách
const detailSach = async (req, res) => {
  try {
    const maSach = req.params.MaSach;
    if (!maSach) {
      return res.status(200).json({
        status: "ERROR",
        message: "Mã sách không được để trống",
      });
    }

    const response = await SachService.detailSach(maSach);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Lỗi phía máy chủ" });
  }
};

// Lấy danh sách sách
const getAllSach = async (req, res) => {
  try {
    const maSach = req.query.MaSach;
    if (!maSach) {
      return res.status(200).json({
        status: "ERROR",
        message: "Mã sách không được để trống",
        getAllSach: [],
      });
    }

    const response = await SachService.getAllSach(maSach);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Lỗi phía máy chủ" });
  }
};

module.exports = { addSach, updateSach, detailSach, getAllSach };

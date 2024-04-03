const DocGiaService = require("../services/DocGia.service");

// Dăng ký tài khoản
const signUp = async (req, res) => {
  try {
    const { DienThoai, Password } = req.body;
    const regex = /^[(]?[0-9]{3}[)]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    const checkPhone = regex.test(DienThoai);

    if (!DienThoai || !Password) {
      return res.status(400).json({
        status: "ERROR",
        message: "Điện thoại và mật khẩu không được để trống",
      });
    } else if (!checkPhone) {
      return res.status(400).json({
        status: "ERROR",
        message: "Điện thoại không hợp lệ",
      });
    }

    const response = await DocGiaService.signUp(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Lỗi phía máy chủ" });
  }
};

// Đăng nhập tài khoản
const signIn = async (req, res) => {
  try {
    const { DienThoai, Password } = req.body;
    const regex = /^[(]?[0-9]{3}[)]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    const checkPhone = regex.test(DienThoai);

    if (!DienThoai || !Password) {
      return res.status(400).json({
        status: "ERROR",
        message: "Điện thoại và mật khẩu không được để trống",
      });
    } else if (!checkPhone) {
      return res.status(400).json({
        status: "ERROR",
        message: "Điện thoại không hợp lệ",
      });
    }

    const response = await DocGiaService.signIn(req.body, res);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Lỗi phía máy chủ" });
  }
};

// Đăng xuất tài khoản
const logOut = (res) => {
  try {
    res.clearCookie("token");
    return {
      status: "OK",
      message: "Đăng xuất thành công",
    };
  } catch (e) {
    console.log(e);
    return res.status(404).json({
      message: "Đăng xuất không thành công",
    });
  }
};

// Cập nhật thông tin đọc giả
const updateDG = async (req, res) => {
  try {
    const { MaDocGia } = req.params;
    const data = req.body;

    if (!MaDocGia) {
      return res.status(200).json({
        status: "ERROR",
        message: "Mã đọc giả không được để trống",
      });
    }

    const response = await DocGiaService.updateDG(MaDocGia, data);

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
    return res.status(404).json({
      status: "ERROR",
      message: "Lỗi phía máy chủ",
    });
  }
};

// Chi tiết đọc giả
const detailDG = async (req, res) => {
  try {
    const maDG = req.query.MaDocGia;
    if (!maDG) {
      return res.status(200).json({
        status: "ERROR",
        message: "Mã đọc giả không được để trống",
      });
    }

    const response = await DocGiaService.detailDG(maDG);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(404).json({
      status: "ERROR",
      message: "Lỗi phía máy chủ",
    });
  }
};

// Lấy danh sách đọc giả
const getAllDG = async (req, res) => {
  try {
    const maDG = req.query.MaDocGia;
    if (!maDG) {
      return res.status(400).json({
        status: "ERROR",
        message: "Mã đọc giả không được để trống",
        getAllDG: [],
      });
    }

    const response = await DocGiaService.getAllDG(maDG);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Lỗi phía máy chủ" });
  }
};

module.exports = {
  signUp,
  signIn,
  logOut,
  updateDG,
  detailDG,
  getAllDG,
};

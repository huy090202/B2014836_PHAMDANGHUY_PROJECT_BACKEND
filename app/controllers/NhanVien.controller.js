const NhanVienService = require("../services/NhanVien.service");

// Đăng ký tài khoản
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

    const response = await NhanVienService.signUp(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Lỗi phía máy chủ" });
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

    const response = await NhanVienService.signIn(req.body, res);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Lỗi phía máy chủ" });
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
    return res.status(404).json({ message: "Đăng xuất không thành công" });
  }
};

// Cập nhật thông tin nhân viên
const updateRoleNV = async (req, res) => {
  try {
    const { MSNV } = req.params;
    const { ChucVu } = req.body;

    if (!MSNV) {
      return res.status(400).json({
        status: "ERROR",
        message: "Mã số nhân viên không được để trống",
      });
    }

    const response = await NhanVienService.updateRoleNV(MSNV, ChucVu);

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

// Xóa tài khoản
const deleteTK = async (req, res) => {
  try {
    const { MaSo } = req.params;
    const response = await NhanVienService.deleteTK(MaSo);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Lỗi phía máy chủ" });
  }
};

// Lấy danh sách nhân viên
const getAllNV = async (req, res) => {
  try {
    const maNV = req.query.MSNV;
    if (!maNV) {
      return res.status(400).json({
        status: "ERROR",
        message: "Mã nhân viên không được để trống",
        getAllNV: [],
      });
    }

    const response = await NhanVienService.getAllNV(maNV);
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
  updateRoleNV,
  deleteTK,
  getAllNV,
};

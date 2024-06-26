const DocGia = require("../models/DocGiaModel");
const NhanVien = require("../models/NhanVienModel");
const NhaXuatBan = require("../models/NhaXuatBanModel");
const Sach = require("../models/SachModel");
const bcrypt = require("bcrypt");
const { genneralAccessToken } = require("./jwt.service");

// Đăng ký tài khoản
const signUp = (data) => {
  return new Promise(async (resolve, reject) => {
    const { HoTenNV, ChucVu, DiaChi, DienThoai, Password } = data;

    try {
      const CheckTaiKhoan = await NhanVien.findOne({ DienThoai: DienThoai });

      if (CheckTaiKhoan !== null) {
        resolve({
          status: "ERROR",
          message: "Điện thoại đã tồn tại",
        });
      }

      let chucVu = "Nhân viên";
      if (ChucVu === true || ChucVu === "Quản lý") {
        chucVu = "Quản lý";
      }

      const hash = bcrypt.hashSync(Password, 10);
      const TaiKhoanMoi = await NhanVien.create({
        HoTenNV,
        ChucVu: chucVu,
        DiaChi,
        DienThoai,
        Password: hash,
      });

      if (TaiKhoanMoi) {
        resolve({
          status: "OK",
          message: "Tạo tài khoản thành công",
          data: TaiKhoanMoi,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

// Đăng nhập tài khoản
const signIn = (data) => {
  return new Promise(async (resolve, reject) => {
    const { DienThoai, Password } = data;

    try {
      const CheckTaiKhoan = await NhanVien.findOne({ DienThoai: DienThoai });
      if (CheckTaiKhoan === null) {
        resolve({
          status: "ERROR",
          message: "Tài khoản đăng nhập không tồn tại",
        });
      }

      const checkPassword = bcrypt.compareSync(
        Password,
        CheckTaiKhoan.Password
      );

      if (!checkPassword) {
        resolve({
          status: "ERROR",
          message: "Mật khẩu không chính xác",
        });
      } else {
        const access_token = await genneralAccessToken({
          id: CheckTaiKhoan.id,
        });

        resolve({
          status: "OK",
          message: "Đăng nhập thành công",
          access_token,
          data: CheckTaiKhoan,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

// Cập nhật thông tin đọc giả
const updateRoleNV = (msnv, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const CapNhatQuyen = await NhanVien.findOneAndUpdate(
        { MSNV: msnv },
        data,
        {
          new: true,
          useFindAndModify: false,
        }
      );

      if (!CapNhatQuyen) {
        resolve({
          status: "ERROR",
          message: "Cập nhật quyền không thành công",
        });
      }

      resolve({
        status: "OK",
        message: "Cập nhật quyền thành công",
        data: CapNhatQuyen,
      });
    } catch (e) {
      reject(e);
    }
  });
};

// Chi tiết nhân viên
const detailNV = (maNV) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!maNV) {
        resolve({
          status: "ERROR",
          message: "Nhân viên không tồn tại",
        });
      }

      const detailNV = await NhanVien.findOne({ MSNV: maNV });

      resolve({
        status: "OK",
        message: "Lấy thông tin nhân viên thành công",
        data: detailNV,
      });
    } catch (e) {
      reject(e);
    }
  });
};

// Xóa tài khoản
const deleteByMaSo = (maSo) => {
  return new Promise(async (resolve, reject) => {
    try {
      const KTNV = await NhanVien.findOne({ MSNV: maSo });
      const KTDG = await DocGia.findOne({ MaDocGia: maSo });
      const KTNXB = await NhaXuatBan.findOne({ MaNXB: maSo });
      const KTSach = await Sach.findOne({ MaSach: maSo });

      if (!KTNV || !KTDG || !KTNXB || !KTSach) {
        resolve({
          status: "ERROR",
          message:
            "Đọc giả hoặc nhân viên hoặc nhà xuất bản hoặc sách không tồn tại",
        });
      }

      if (KTNV) {
        await NhanVien.findOneAndDelete(maSo);
      } else if (KTDG) {
        await DocGia.findOneAndDelete(maSo);
      } else if (KTNXB) {
        await NhaXuatBan.findOneAndDelete(maSo);
      } else if (KTSach) {
        await Sach.findOneAndDelete(maSo);
      }

      resolve({
        status: "OK",
        message: "Xóa tài khoản thành công",
      });
    } catch (e) {
      reject(e);
    }
  });
};

// Lấy danh sách nhân viên
const getAllNV = (maNV) => {
  return new Promise(async (resolve, reject) => {
    try {
      let allNV = "";
      if (maNV && maNV === "All") {
        allNV = await NhanVien.find({}, { Password: 0 }).sort({
          createdAt: -1,
          updatedAt: -1,
        });
      }

      if (maNV && maNV !== "All") {
        allNV = await NhanVien.findOne({ MSNV: maNV }, { Password: 0 });
      }

      resolve({
        status: "OK",
        message: "Lấy danh sách nhân viên thành công",
        allNV,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = { signUp, signIn, updateRoleNV, deleteByMaSo, getAllNV, detailNV };

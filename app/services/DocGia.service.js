const DocGia = require("../models/DocGiaModel");
const bcrypt = require("bcrypt");

// Dăng ký tài khoản
const signUp = (data) => {
  return new Promise(async (resolve, reject) => {
    const { HoLot, Ten, NgaySinh, Phai, DiaChi, DienThoai, Password } = data;

    try {
      const CheckTaiKhoan = await DocGia.findOne({ DienThoai: DienThoai });

      if (CheckTaiKhoan !== null) {
        resolve({
          status: "ERROR",
          message: "Điện thoại đã tồn tại",
        });
      }

      let phai = "Nữ";

      if (Phai === true || Phai === "Nam") {
        phai = "Nam";
      }

      const hash = bcrypt.hashSync(Password, 10);

      const TaiKhoanMoi = await DocGia.create({
        HoLot,
        Ten,
        NgaySinh,
        Phai: phai,
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
const signIn = (data, res) => {
  return new Promise(async (resolve, reject) => {
    const { DienThoai, Password } = data;

    try {
      const CheckTaiKhoan = await DocGia.findOne({ DienThoai: DienThoai });
      if (CheckTaiKhoan === null) {
        resolve({
          status: "ERROR",
          message: "Tài khoản đăng nhập không tồn tại",
        });
      }

      const CheckPassword = bcrypt.compareSync(
        Password,
        CheckTaiKhoan.Password
      );

      if (!CheckPassword) {
        resolve({
          status: "ERROR",
          message: "Mật khẩu không đúng",
        });
      } else {
        res.cookie("token", CheckTaiKhoan.MaDocGia, { httpOnly: true });
        resolve({
          status: "OK",
          message: "Đăng nhập thành công",
          data: CheckTaiKhoan,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

// Cập nhật thông tin đọc giả
const updateDG = (maDocGia, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const CapNhatDocGia = await DocGia.findOneAndUpdate(
        { MaDocGia: maDocGia },
        data,
        {
          new: true,
          useFindAndModify: false,
        }
      );

      if (!CapNhatDocGia) {
        resolve({
          status: "ERROR",
          message: "Cập nhật thông tin đọc giả không thành công",
        });
      }

      resolve({
        status: "OK",
        message: "Cập nhật thông tin đọc giả thành công",
        data: CapNhatDocGia,
      });
    } catch (e) {
      reject(e);
    }
  });
};

// Chi tiết đọc giả
const detailDG = (maDocGia) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!maDocGia) {
        resolve({
          status: "ERROR",
          message: "Đọc giả không tồn tại",
        });
      }

      const detailDG = await DocGia.findOne({ MaDocGia: maDocGia });

      resolve({
        status: "OK",
        message: "Lấy thông tin đọc giả thành công",
        data: detailDG,
      });
    } catch (e) {
      reject(e);
    }
  });
};

// Lấy danh sách đọc giả
const getAllDG = (maDocGia) => {
  return new Promise(async (resolve, reject) => {
    try {
      let allDG = "";
      if (maDocGia && maDocGia === "All") {
        allDG = await DocGia.find({}, { Password: 0 }).sort({
          createdAt: -1,
          updatedAt: -1,
        });
      }

      if (maDocGia && maDocGia !== "All") {
        allDG = await DocGia.findOne({ MaDocGia: maDocGia }, { Password: 0 });
      }

      resolve({
        status: "OK",
        message: "Lấy danh sách đọc giả thành công",
        allDG,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = { signUp, signIn, updateDG, detailDG, getAllDG };

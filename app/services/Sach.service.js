const Sach = require("../models/SachModel");

// Thêm sách
const addSach = async (data) => {
  return new Promise(async (resolve, reject) => {
    const { TenSach, DonGia, SoQuyen, NamXuatBan, MaNXB, TacGia } = data;

    try {
      const SachMoi = await Sach.create({
        TenSach,
        DonGia,
        SoQuyen,
        NamXuatBan,
        MaNXB,
        TacGia,
      });

      if (SachMoi) {
        resolve({
          status: "OK",
          message: "Thêm sách thành công",
          data: SachMoi,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

// Cập nhật thông tin sách
const updateSach = (maSach, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const CapNhatSach = await Sach.findOneAndUpdate(
        { MaSach: maSach },
        data,
        {
          new: true,
          useFindAndModify: false,
        }
      );

      if (!CapNhatSach) {
        resolve({
          status: "ERROR",
          message: "Cập nhật thông tin sách không thành công",
        });
      }

      resolve({
        status: "OK",
        message: "Cập nhật thông tin sách thành công",
        data: CapNhatSach,
      });
    } catch (e) {
      reject(e);
    }
  });
};

// Chi tiết sách
const detailSach = (maSach) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!maSach) {
        resolve({
          status: "ERROR",
          message: "Sách không tồn tại",
        });
      }

      const detailSach = await Sach.findOne({ MaSach: maSach });

      let HinhAnhBase64 = "";
      if (detailSach.HinhAnh) {
        HinhAnhBase64 = new Buffer(detailSach.HinhAnh, "base64").toString(
          "binary"
        );
      }

      resolve({
        status: "OK",
        message: "Lấy thông tin sách thành công",
        data: detailSach,
        HinhAnhBase64,
      });
    } catch (e) {
      reject(e);
    }
  });
};

// Lấy danh sách sách
const getAllSach = (maSach) => {
  return new Promise(async (resolve, reject) => {
    try {
      let allSach = "";
      if (maSach && maSach === "All") {
        allSach = await Sach.find({}).sort({ createdAt: -1, updatedAt: -1 });
      }

      if (maSach && maSach !== "All") {
        allSach = await Sach.findOne({ MaSach: maSach });
      }

      resolve({
        status: "OK",
        message: "Lấy danh sách sách thành công",
        allSach,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = { addSach, updateSach, detailSach, getAllSach };

const TheoDoiMuonSach = require("../models/TheoDoiMuonSachModel");

// Tạo mới một theo dõi mượn sách
const createTDMS = (data) => {
  return new Promise(async (resolve, reject) => {
    const { MaDocGia, MaSach, TrangThai, NgayMuon, NgayTra } = data;

    try {
      if (NgayMuon >= NgayTra) {
        resolve({
          status: "ERROR",
          message: "Ngày trả sách phải sau ngày mượn sách",
          data: {}
        });
      }

      let trangThai = "Đang mượn";

      if (TrangThai === true || trangThai === "Đã trả") {
        trangThai = "Đã trả";
      }

      const newTDMS = await TheoDoiMuonSach.create({
        MaDocGia,
        MaSach,
        TrangThai: trangThai,
        NgayMuon,
        NgayTra,
      });

      if (newTDMS) {
        resolve({
          status: "OK",
          message: "Tạo mới một theo dõi mượn sách thành công",
          data: newTDMS,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

// Cập nhật thông tin theo dõi mượn sách
const updateTDMS = (maDG, maSach, ngayMuon, trangThai) => {
  return new Promise(async (resolve, reject) => {
    try {
      const CapNhatTDMS = await TheoDoiMuonSach.findOneAndUpdate(
        {
          MaDocGia: maDG,
          MaSach: maSach,
          NgayMuon: ngayMuon,
        },
        {
          TrangThai: trangThai,
        },
        {
          new: true,
          useFindAndModify: false,
        }
      );

      if (!CapNhatTDMS) {
        resolve({
          status: "ERROR",
          message: "Cập nhật thông tin theo dõi mượn sách không thành công",
        });
      }

      resolve({
        status: "OK",
        message: "Cập nhật thông tin theo dõi mượn sách thành công",
        data: CapNhatTDMS,
      });
    } catch (e) {
      reject(e);
    }
  });
};

// Chi tiết theo dõi mượn sách
const detailTDMS = (maDG, maSach, ngayMuon) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!maDG || !maSach || !ngayMuon) {
        resolve({
          status: "ERROR",
          message: "Theo dõi mượn sách không tồn tại",
        });
      }

      const detailTDMS = await TheoDoiMuonSach.findOne({
        MaDocGia: maDG,
        MaSach: maSach,
        NgayMuon: ngayMuon,
      });

      resolve({
        status: "OK",
        message: "Lấy thông tin theo dõi mượn sách thành công",
        data: detailTDMS,
      });
    } catch (e) {
      reject(e);
    }
  });
};

// Lấy danh sách theo dõi mượn sách
const getAllTDMS = (maDG, maSach, ngayMuon) => {
  return new Promise(async (resolve, reject) => {
    try {
      let allTDMS = "";
      if (
        (maDG && maDG === "All") ||
        (maSach && maSach === "All") ||
        (ngayMuon && ngayMuon === "All")
      ) {
        allTDMS = await TheoDoiMuonSach.find({}).sort({
          createdAt: -1,
          updatedAt: -1,
        });
      }

      if (
        (maDG && maDG !== "All") ||
        (maSach && maSach !== "All") ||
        (ngayMuon && ngayMuon !== "All")
      ) {
        allTDMS = await TheoDoiMuonSach.findOne({
          MaDocGia: maDG,
          MaSach: maSach,
          NgayMuon: ngayMuon,
        });
      }

      resolve({
        status: "OK",
        message: "Lấy danh sách theo dõi mượn sách thành công",
        allTDMS,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = { createTDMS, updateTDMS, detailTDMS, getAllTDMS };

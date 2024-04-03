const TheoDoiMuonSach = require("../models/TheoDoiMuonSachModel");

// Tạo mới một theo dõi mượn sách
const createTDMS = (data) => {
  return new Promise(async (resolve, reject) => {
    const { MaDocGia, MaSach, NgayMuon, NgayTra } = data;

    try {
      const newTDMS = await TheoDoiMuonSach.create({
        MaDocGia,
        MaSach,
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
const updateTDMS = (maTDMS, ngayTra) => {
  return new Promise(async (resolve, reject) => {
    try {
      const CapNhatTDMS = await TheoDoiMuonSach.findOneAndUpdate(
        { MaTDMS: maTDMS },
        { $set: { NgayTra: ngayTra } },
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
const detailTDMS = (maTDMS) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!maTDMS) {
        resolve({
          status: "ERROR",
          message: "Theo dõi mượn sách không tồn tại",
        });
      }

      const detailTDMS = await TheoDoiMuonSach.findOne({ MaTDMS: maTDMS });

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
const getAllTDMS = (maTDMS) => {
  return new Promise(async (resolve, reject) => {
    try {
      let allTDMS = "";
      if (maTDMS && maTDMS === "All") {
        allTDMS = await TheoDoiMuonSach.find({}).sort({
          createdAt: -1,
          updatedAt: -1,
        });
      }

      if (maTDMS && maTDMS !== "All") {
        allTDMS = await TheoDoiMuonSach.findOne({ MaTDMS: maTDMS });
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

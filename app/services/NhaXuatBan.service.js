const NhaXuatBan = require("../models/NhaXuatBanModel");

// Tạo mới nhà xuất bản
const createNXB = (data) => {
  return new Promise(async (resolve, reject) => {
    const { TenNXB, DiaChi } = data;

    try {
      const CheckNXB = await NhaXuatBan.findOne({ TenNXB: TenNXB });

      if (CheckNXB !== null) {
        resolve({
          status: "ERROR",
          message: "Nhà xuất bản đã tồn tại",
        });
      }

      const NXBMoi = await NhaXuatBan.create({
        TenNXB,
        DiaChi,
      });

      if (NXBMoi) {
        resolve({
          status: "OK",
          message: "Tạo nhà xuất bản thành công",
          data: NXBMoi,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

// Cập nhật thông tin nhà xuất bản
const updateNXB = (maNXB, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const CapNhatNXB = await NhaXuatBan.findOneAndUpdate(
        { MaNXB: maNXB },
        data,
        {
          new: true,
          useFindAndModify: false,
        }
      );

      if (!CapNhatNXB) {
        resolve({
          status: "ERROR",
          message: "Cập nhật thông tin nhà xuất bản không thành công",
        });
      }

      resolve({
        status: "OK",
        message: "Cập nhật thông tin nhà xuất bản thành công",
        data: CapNhatNXB,
      });
    } catch (e) {
      reject(e);
    }
  });
};

// Lấy danh sách nhà xuất bản
const getAllNXB = (maNXB) => {
  return new Promise(async (resolve, reject) => {
    try {
      let allNXB = "";
      if (maNXB && maNXB === "All") {
        allNXB = await NhaXuatBan.find({}).sort({
          createdAt: -1,
          updateAt: -1,
        });
      }

      if (maNXB && maNXB !== "All") {
        allNXB = await NhaXuatBan.find({ MaNXB: maNXB });
      }

      resolve({
        status: "OK",
        message: "Lấy danh sách nhà xuất bản thành công",
        data: allNXB,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = { createNXB, updateNXB, getAllNXB };

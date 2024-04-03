const mongoose = require("mongoose");

const NhanVienSchema = new mongoose.Schema(
  {
    MSNV: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      auto: true,
      primaryKey: true,
    },
    HoTenNV: { type: String, required: true },
    Password: { type: String, required: true },
    ChucVu: { type: String, default: "Nhân viên", enum: ["Nhân viên", "Quản lý"]},
    DiaChi: { type: String },
    DienThoai: { type: Number, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const NhanVien = mongoose.model("NhanVien", NhanVienSchema);
module.exports = NhanVien;

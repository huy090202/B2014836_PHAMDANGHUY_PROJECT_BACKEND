const mongoose = require("mongoose");

const SachSchema = new mongoose.Schema(
  {
    MaSach: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      auto: true,
      primaryKey: true,
    },
    TenSach: { type: String, required: true, unique: true },
    HinhAnh: { type: String },
    DonGia: { type: Number, required: true },
    SoQuyen: { type: Number, required: true, default: 1 },
    NamXuatBan: { type: String, required: true },
    MaNXB: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NhaXuatBan",
      required: true,
    },
    TacGia: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Sach = mongoose.model("Sach", SachSchema);
module.exports = Sach;

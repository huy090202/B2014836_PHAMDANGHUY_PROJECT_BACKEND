const mongoose = require("mongoose");

const DocGiaSchema = new mongoose.Schema(
  {
    MaDocGia: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      auto: true,
      primaryKey: true,
    },
    HoLot: { type: String, required: true },
    Ten: { type: String, required: true },
    NgaySinh: { type: Date},
    Phai: { type: String, enum: ["Nam", "Nữ"], default: "Nữ" },
    DiaChi: { type: String },
    DienThoai: { type: Number, required: true, unique: true },
    Password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const DocGia = mongoose.model("DocGia", DocGiaSchema);
module.exports = DocGia;

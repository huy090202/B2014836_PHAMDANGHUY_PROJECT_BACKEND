const mongoose = require("mongoose");

const NhaXuatBanSchema = new mongoose.Schema(
  {
    MaNXB: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      auto: true,
      primaryKey: true,
    },
    TenNXB: { type: String, required: true },
    DiaChi: { type: String },
  },
  {
    timestamps: true,
  }
);

const NhaXuatBan = mongoose.model("NhaXuatBan", NhaXuatBanSchema);
module.exports = NhaXuatBan;

const mongoose = require("mongoose");

const TheoDoiMuonSachSchema = new mongoose.Schema(
  {
    MaDocGia: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DocGia",
      required: true,
    },
    MaSach: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sach",
      required: true,
    },
    NgayMuon: { type: Date, required: true, primaryKey: true },
    NgayTra: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

TheoDoiMuonSachSchema.path("NgayMuon").validate(function (value) {
  return value < this.NgayTra;
}, "Ngày trả sách phải sau ngày mượn sách");

const TheoDoiMuonSach = mongoose.model(
  "TheoDoiMuonSach",
  TheoDoiMuonSachSchema
);
module.exports = TheoDoiMuonSach;

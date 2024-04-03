const DocGiaRouter = require("./DocGia.route");
const SachRouter = require("./Sach.route");
const NhanVienRouter = require("./NhanVien.route");
const NhaXuatBanRouter = require("./NhaXuatBan.route");
const TheoDoiMuonSachRouter = require("./TheoDoiMuonSach.route");

const routes = (app) => {
  app.use("/api/DocGia", DocGiaRouter);
  app.use("/api/Sach", SachRouter);
  app.use("/api/NhanVien", NhanVienRouter);
  app.use("/api/NhaXuatBan", NhaXuatBanRouter);
  app.use("/api/TheoDoiMuonSach", TheoDoiMuonSachRouter);
};

module.exports = routes;

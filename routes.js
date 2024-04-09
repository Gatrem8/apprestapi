"use stricts";

module.exports = function (app) {
  var jsonku = require("./controller");

  app.route("/").get(jsonku.index);
  app.route("/tampil").get(jsonku.tampilSemuaMahasiswa);
  app.route("/tampil/:id").get(jsonku.tampilSemuaMahasiswaById);
  app.route("/tambah").post(jsonku.tambahMahasiswa);
  app.route("/ubah").put(jsonku.ubahMahasiswa);
  app.route("/hapus").delete(jsonku.hapusMahasiswa);
};

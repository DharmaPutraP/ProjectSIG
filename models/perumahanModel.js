const mongoose = require("mongoose");

const perumahanSchema = new mongoose.Schema({
  nama_perumahan: String,
  alamat: String,
  tipe: Number,
  luas_tanah: Number,
  kecamatan: String,
  nomor_hp: String,
  gambar: String,
});

module.exports = mongoose.model("Perumahan", perumahanSchema);

const mongoose = require("mongoose");

const perumahanSchema = new mongoose.Schema({
  nama_perumahan: { type: String, required: true },
  alamat: { type: String, required: true },
  tipe: { type: Number, required: true },
  luas_tanah: { type: Number, required: true },
  harga: { type: Number, required: true },
  isAvailable: { type: String, enum: ["Available", "Sold"], required: true },
  kecamatan: { type: String, required: true },
  nomor_hp: { type: Number, required: true }, // If you want to keep it as a string to store the long number
  imgUrl: { type: String, required: true }, // The image URL or path
  y: { type: Number, required: true },
  x: { type: Number, required: true },
});
module.exports = mongoose.model("Perumahan", perumahanSchema);

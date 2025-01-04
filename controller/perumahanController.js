import Perumahan from "../models/perumahanModel.js";
import { StatusCodes } from "http-status-codes";
import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const kecamatan = req.body.kecamatan;
    const uploadPath = path.join("public", kecamatan);

    // Create the kecamatan folder if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const filename = `${req.body.nama_perumahan.replace(
      / /g,
      "_"
    )}${path.extname(file.originalname)}`;
    cb(null, filename);
  },
});
const upload = multer({ storage });

export const getAll = async (req, res) => {
  try {
    const houses = await Perumahan.find();
    res.status(200).json(houses);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getById = async (req, res) => {
  try {
    const house = await Perumahan.findById(req.params.id);
    if (!house) {
      return res.status(404).json({ message: "Perumahan not found" });
    }
    res.status(200).json(house);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getUniqueValues = async (req, res) => {
  try {
    const { column } = req.query;

    if (!column) {
      return res.status(400).json({ message: "Column parameter is required" });
    }

    // Ambil semua data dari database
    const data = await Perumahan.find();

    // Ambil nilai unik untuk kolom yang diminta
    const uniqueValues = [...new Set(data.map((item) => item[column]))].sort(
      (a, b) => {
        if (typeof a === "number" && typeof b === "number") {
          return a - b; // Untuk angka, urutkan secara numerik
        }
        return String(a).localeCompare(String(b)); // Untuk string, urutkan alfabetis
      }
    );

    if (uniqueValues.length === 0) {
      return res
        .status(404)
        .json({ message: `No unique values found for column: ${column}` });
    }

    res.status(200).json(uniqueValues);
  } catch (error) {
    console.error("Error in getUniqueValues:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createPerumahan = async (req, res) => {
  try {
    const { nama_perumahan, alamat, tipe, luas_tanah, kecamatan, nomor_hp } =
      req.body;

    // Save image path in the database
    const imgUrl = `/${kecamatan}/${req.file.filename}`;

    const newPerumahan = await Perumahan.create({
      nama_perumahan,
      alamat,
      tipe,
      luas_tanah,
      harga,
      isAvailable,
      y,
      x,
      kecamatan,
      nomor_hp,
      imgUrl,
    });
    res.status(StatusCodes.CREATED).json(newPerumahan);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};
export const uploadImage = upload.single("image");

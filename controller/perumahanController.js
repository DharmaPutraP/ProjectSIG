import Perumahan from "../models/perumahanModel.js";

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

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

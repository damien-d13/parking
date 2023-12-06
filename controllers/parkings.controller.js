const Parking = require("../models/parking.model");

exports.create = async (req, res) => {
  try {
    const parking = await Parking.create(req.body);
    res.status(201).json(parking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const parkings = await Parking.find();
    res.json(parkings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const parking = await Parking.findById(req.params.id);
    if (!parking) {
      return res.status(404).json({ message: "Parking not found" });
    }
    res.json(parking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const parking = await Parking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
    });
    if (!parking) {
      return res.status(404).json({ message: "Parking not found" });
    }
    res.json(parking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const parking = await Parking.findByIdAndRemove(req.params.id, {
      useFindAndModify: false,
    });
    if (!parking) {
      return res.status(404).json({ message: "Parking not found" });
    }
    res.json({ message: "Parking deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAll = async (req, res) => {
  try {
    await Parking.deleteMany();
    res.json({ message: "All parkings deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.findAllByWorked = (req, res) => {
  Parking.find({ worked: true })
    .then((parkings) => {
      res.send(parkings);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving parkings.",
      });
    });
};
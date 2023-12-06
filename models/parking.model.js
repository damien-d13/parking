const mongoose = require('mongoose');

const schema = mongoose.Schema(
  {
    title: String,
    description: String,
    worked: Boolean,
  },
  { timestamps: true }
);

const Parking = mongoose.model('Parking', schema);

module.exports = Parking;

const { Schema, model } = require('mongoose');

const varsitySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  shortName: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
  },
  accYear: [{
    start: { type: String, required: true },
    end: { type: String, required: true }
  }],
  units: [{
    code: { type: String, required: true },
    group: { type: String, required: true }
  }]
})

module.exports = model('varsities', varsitySchema);
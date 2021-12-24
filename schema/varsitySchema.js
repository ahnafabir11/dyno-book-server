const { Schema, model } = require('mongoose');

const varsitySchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  shortName: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  accYear: [{
    start: { type: String, required: true },
    end: { type: String, required: true },
    units: [{
      code: { type: String, required: true, lowercase: true },
      group: { type: String, required: true, lowercase: true }
    }]
  }]
})

module.exports = model('varsities', varsitySchema);
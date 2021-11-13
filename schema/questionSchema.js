const { Schema, model } = require('mongoose');

const questionSchema = new Schema({
  varsityName: {
    type: String,
    required: true,
    lowercase: true,
    tirm: true,
  },
  accYear: {
    type: String,
    required: true,
    trim: true,
  },
  unit: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  question: {
    ban: {
      type: String,
      required: true,
      tirm: true,
    },
    eng: {
      type: String,
      lowercase: true,
      tirm: true,
    },
    bng: {
      type: String,
      lowercase: true,
      tirm: true,
    },
  },
  options: [{
    ban: {
      type: String,
      required: true,
      trim: true,
    },
    eng: {
      type: String,
      lowercase: true,
      trim: true,
    },
  }],
  answer: [{
    ban: {
      type: String,
      required: true,
      trim: true,
    },
    eng: {
      type: String,
      lowercase: true,
      trim: true,
    }
  }],
  explanation: {
    ban: {
      type: String,
      trim: true,
    },
    eng: {
      type: String,
      lowercase: true,
      trim: true,
    }
  },
  category: [{
    value: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    }
  }]
})

module.exports = model('questions', questionSchema)
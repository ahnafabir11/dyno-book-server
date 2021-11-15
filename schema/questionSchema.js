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
  questionPassage: {
    type: String,
    trim: true,
  },
  question: {
    type: String,
    required: true,
    tirm: true,
  },
  options: [{
    type: String,
    required: true,
    trim: true
  }],
  answer: {
    type: String,
    required: true,
    trim: true,
  },
  explanation: {
    type: String,
    trim: true,
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
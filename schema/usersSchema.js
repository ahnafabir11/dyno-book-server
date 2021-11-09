const {Schema, model} = require('mongoose');

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    default: 'writer',
    trim: true,
  },
  profileImg: {
    type: String,
    default: '',
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  }, 
  joiningDate: {
    type: Date,
    default: new Date()
  }
})

module.exports = model('users', userSchema);
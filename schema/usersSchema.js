const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

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

// hashing password
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt)
  
  next()
})

module.exports = model('users', userSchema);
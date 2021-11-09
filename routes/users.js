const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const UserModel = require('../schema/usersSchema')


// get all users data
router.get('/', async (req, res) => {
  try {
    const usersList = await UserModel.find()
    const result = { data: usersList, response: {} }
    res.status(200).send(result)

  } catch (error) {
    const result = { data: [], response: { message: error.message } }
    res.status(500).send(result)

  }
})


// get specific user data
router.get('/:userId', async (req, res) => {
  const id = req.params.userId;

  try {
    const user = await UserModel.findById(id)

    if (user) {
      // one user found
      const result = { data: [user], response: {} }
      res.status(200).send(result)

    } else {
      // no user found
      const result = { data: [], response: { message: "user not found" } }
      res.status(404).send(result)

    }

  } catch (error) {
    const result = { data: [], response: { message: error.message } }
    res.status(500).send(result)

  }
})


// create new user data
router.post('/signup', async (req, res) => {
  const userData = req.body;

  try {
    const isUserFound = await UserModel.findOne({ email: userData.email })

    if (isUserFound) {
      // email already taken
      // so con't create new account
      const result = { data: [], response: { message: 'email is already registered' } }
      res.status(400).send(result)

    } else {
      // email not taken --> creating
      const newUser = new UserModel({
        fullName: userData.fullName,
        email: userData.email,
        password: userData.password,
      })

      const createdUser = await newUser.save()
      const result = { data: [createdUser], response: {} }
      res.status(201).send(result)

    }
  } catch (error) {
    const result = { data: [], response: { message: error.message } }
    res.status(500).send(result)
  }
})


// delete specific user data
router.delete('/delete', async (req, res) => {
  const id = req.body.id;

  try {
    const isUserFound = await UserModel.findById(id)

    if (isUserFound) {
      // user found --> deleting
      await UserModel.findByIdAndDelete(id)
      const result = { data: [], response: { message: 'user has been deleted successfully' } }
      res.status(200).send(result)

    } else {
      // user not found
      // can't delete user
      const result = { data: [], response: { message: 'user not found to delete' } }
      res.status(404).send(result)

    }

  } catch (error) {
    const result = { data: [], response: { message: error.message } }
    res.status(500).send(result)

  }
})


// update one user data
router.put('/update', async (req, res) => {
  const userData = req.body;

  try {
    const isUserFound = await UserModel.findById(userData.id)

    if (isUserFound) {
      // user found --> updating 
      const updateduser = await UserModel.findByIdAndUpdate({ _id: userData.id }, {
        fullName: userData.fullName,
        email: userData.email,
        role: userData.role,
        profileImg: userData.profileImg,
        password: userData.password,
      }, { new: true });
      const result = { data: [updateduser], response: {} }
      res.status(200).send(result)

    } else {
      // user not found
      // can't update user
      const result = { data: [], response: { message: 'user not found to update' } }
      res.status(404).send(result)

    }

  } catch (error) {
    const result = { data: [], response: { message: error.message } }
    res.status(500).send(result)

  }
})


// login user 
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email })

    if (user) {
      // user found --> check password
      const auth = await bcrypt.compare(password, user.password)

      if (auth) {
        const result = { data: [user], response: {} }
        res.status(200).send(result)

      } else {
        const result = { data: [], response: { message: "invalid credentials" } }
        res.status(400).send(result)

      }

    } else {
      // user not found --> can't login
      const result = { data: [], response: { message: 'invalid credentials' } }
      res.status(404).send(result)

    }

  } catch (error) {
    const result = { data: [], response: { message: error.message } }
    res.status(500).send(result)
  }
})


module.exports = router;
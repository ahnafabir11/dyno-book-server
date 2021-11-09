const express = require('express');
const router = express.Router();

const UserModel = require('../schema/usersSchema')


// get all users data
router.get('/', async (req, res) => {
  try {
    const usersList = await UserModel.find()
    res.status(200).send(usersList)

  } catch (error) {
    res.status(500).send(error.message);

  }
})


// get specific user data
router.get('/:userId', async (req, res) => {
  const id = req.params.userId;

  try {
    const user = await UserModel.findById(id)

    if (user) {
      // one user found
      res.status(200).send(user)

    } else {
      // no user found
      res.status(404).send({ action: false, message: 'user not found' })

    }

  } catch (error) {
    res.status(500).send(error.message)

  }
})


// create new user data
router.post('/create', async (req, res) => {
  const userData = req.body;

  try {
    const isUserFound = await UserModel.findOne({ email: userData.email })

    if (isUserFound) {
      // email already taken
      // so con't create new account
      res.status(400).send({ action: false, message: 'email already taken' })

    } else {
      // email not taken --> creating
      const newUser = new UserModel({
        fullName: userData.fullName,
        email: userData.email,
        password: userData.password,
      })

      const createdUser = await newUser.save()
      res.status(201).send(createdUser)

    }
  } catch (error) {
    res.status(500).send(error.message)
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
      res.status(200).send({ action: true, message: "user has been deleted successfully" })

    } else {
      // user not found
      // can't delete user
      res.status(404).send({ action: false, message: 'user not found to delete' })

    }

  } catch (error) {
    res.status(500).send(error.message)

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

      res.status(200).send(updateduser)

    } else {
      // user not found
      // can't update user
      res.status(404).send({ action: false, message: 'user not found to update' })

    }

  } catch (error) {
    res.status(500).send(error.message)

  }
})


module.exports = router;
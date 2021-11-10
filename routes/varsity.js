const express = require('express');
const router = express.Router();

const VarsityModel = require('../schema/varsitySchema')

// get all varsity info
router.get('/', async (req, res) => {
  try {
    const varsityList = await VarsityModel.find()
    const result = { data: varsityList, response: {} }
    res.status(200).send(result)

  } catch (error) {
    const result = { data: [], response: { message: error.message } }
    res.status(500).send(result)

  }
})


// get specific varsity by id
router.get('/:varsityId', async (req, res) => {
  const id = req.params.varsityId

  try {
    // check if varsity exist
    const varsityInfo = await VarsityModel.findById(id)

    if (varsityInfo) {
      // varsity found
      const result = { data: [varsityInfo], response: {} }
      res.status(200).send(result)

    } else {
      // varsity not found
      const result = { data: [], response: { message: 'varsity not found' } }
      res.status(404).send(result)

    }

  } catch (error) {
    const result = { data: [], response: { message: error.message } }
    res.status(500).send(result)

  }
})

// get specific varsity by short name
router.get('/?sname', async (req, res) => {
  const shortName = req.query.sname

  try {
    // check if varsity exist
    const varsityInfo = await VarsityModel.findOne(shortName)

    if (varsityInfo) {
      // varsity found
      const result = { data: [varsityInfo], response: {} }
      res.status(200).send(result)

    } else {
      // varsity not found
      const result = { data: [], response: { message: 'varsity not found' } }
      res.status(404).send(result)

    }

  } catch (error) {
    const result = { data: [], response: { message: error.message } }
    res.status(500).send(result)

  }
})


// add new varsity
router.post('/add', async (req, res) => {
  const varsityInfo = req.body;

  try {
    // check if varsity already exsit
    const isVarsityFound = await VarsityModel.findOne({ name: varsityInfo.name })

    if (isVarsityFound) {
      // varsity found
      const result = { data: [], response: { message: 'varsity is already registered' } }
      res.status(400).send(result)

    } else {
      // varsity not found
      const newVarsity = new VarsityModel({
        name: varsityInfo.name,
        shortName: varsityInfo.shortName,
        accYear: varsityInfo.accYear,
        units: varsityInfo.units
      })

      const createdVarsity = await newVarsity.save()
      const result = { data: createdVarsity, response: { message: "new varsity created" } }
      res.status(201).send(result)

    }

  } catch (error) {
    const result = { data: [], response: { message: error.message } }
    res.status(500).send(result)

  }

})


// delete varsity with all info
router.delete('/delete', async (req, res) => {
  const id = req.body.id;

  try {
    // check if varsity exists
    const isVarsityFound = await VarsityModel.findById(id)

    if (isVarsityFound) {
      // varsity found
      await VarsityModel.findByIdAndDelete(id)
      const result = { data: [], response: { message: 'varsity is deleted successfully' } }
      res.status(200).send(result)

    } else {
      // varsity not found
      const result = { data: [], response: { message: 'varsity not found' } }
      res.status(404).send(result)

    }

  } catch (error) {
    const result = { data: [], response: { message: error.message } }
    res.status(500).send(result)

  }
})


// update varsity name or short name
router.put('/update/name', async (req, res) => {
  const varsityInfo = req.body;

  try {
    // chech if varsity exists
    const isVarsityFound = await VarsityModel.findById({ _id: varsityInfo.id })

    if (isVarsityFound) {
      // varsity found
      const updatedVarsity = await VarsityModel.findByIdAndUpdate({ _id: varsityInfo.id }, {
        name: varsityInfo.name,
        shortName: varsityInfo.shortName
      }, { new: true })

      const result = { data: [updatedVarsity], response: { message: 'varsity info updated' } }
      res.status(200).send(result)

    } else {
      // varsity not found
      const result = { data: [], response: { message: 'varsity not found' } }
      res.status(404).send(result)

    }

  } catch (error) {
    const result = { data: [], response: { message: error.message } }
    res.status(500).send(result)

  }
})


// create new acc year 
router.put('/add/accYear', async (req, res) => {
  const accYearInfo = req.body;

  try {
    // check if varsity exist
    const isVarsityFound = await VarsityModel.findById({ _id: accYearInfo.varsityId })

    if (isVarsityFound) {
      // varsity found
      const updatedVarsity = await VarsityModel.findByIdAndUpdate(
        { _id: accYearInfo.varsityId },
        {
          $push: {
            accYear: {
              start: accYearInfo.start,
              end: accYearInfo.end
            }
          }
        }, { new: true }
      )

      const result = { data: [updatedVarsity], response: { message: "new acc year added" } }
      res.status(200).send(result)

    } else {
      // varsity not found
      const result = { data: [], response: { message: 'varsity not found' } }
      res.status(404).send(result)

    }
  } catch (error) {
    const result = { data: [], response: { message: error.message } }
    res.status(500).send(result)

  }
})


// remove acc year 
router.put('/remove/accYear', async (req, res) => {
  const accYearInfo = req.body;

  try {
    // check if varsity exist
    const isVarsityFound = await VarsityModel.findById({ _id: accYearInfo.varsityId })

    if (isVarsityFound) {
      // varsity found
      const updatedVarsity = await VarsityModel.findByIdAndUpdate(
        { _id: accYearInfo.varsityId },
        {
          $pull: {
            accYear: { _id: accYearInfo.yearId }
          }
        }, { new: true }
      )

      const result = { data: [updatedVarsity], response: { message: "acc year removed" } }
      res.status(200).send(result)

    } else {
      // varsity not found
      const result = { data: [], response: { message: 'varsity not found' } }
      res.status(404).send(result)

    }
  } catch (error) {
    const result = { data: [], response: { message: error.message } }
    res.status(500).send(result)

  }
})


// create new unit
router.put('/add/unit', async (req, res) => {
  const unitInfo = req.body;

  try {
    // check if varsity exist
    const isVarsityFound = await VarsityModel.findById({ _id: unitInfo.varsityId })

    if (isVarsityFound) {
      // varsity found
      const updatedVarsity = await VarsityModel.findByIdAndUpdate(
        { _id: unitInfo.varsityId },
        {
          $push: {
            units: {
              code: unitInfo.code,
              group: unitInfo.group
            }
          }
        }, { new: true }
      )

      const result = { data: [updatedVarsity], response: { message: "new unit added" } }
      res.status(200).send(result)

    } else {
      const result = { data: [], response: { message: "varsity not found" } }
      res.status(404).send(result)
    }


  } catch (error) {
    const result = { data: [], response: { message: error.message } }
    res.status(500).send(result)

  }
})


// remove unit
router.put('/remove/unit', async (req, res) => {
  const unitInfo = req.body;

  try {
    // check if varsity exist
    const isVarsityFound = await VarsityModel.findById({ _id: unitInfo.varsityId })

    if (isVarsityFound) {
      // varsity found
      const updatedVarsity = await VarsityModel.findByIdAndUpdate(
        { _id: unitInfo.varsityId },
        {
          $pull: {
            units: { _id: unitInfo.unitId }
          }
        }, { new: true }
      )

      const result = { data: [updatedVarsity], response: { message: "acc year removed" } }
      res.status(200).send(result)


    } else {
      // varsity not found
      const result = { data: [], response: { message: "varsity not found" } }
      res.status(404).send(result)
    }

  } catch (error) {
    const result = { data: [], response: { message: error.message } }
    res.status(500).send(result)
  }

})


module.exports = router;
require("dotenv").config()
const cors = require("cors")
const express = require("express")
const mongoose = require("mongoose")

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// ROUTES
app.get('/', async (req, res) => {
  try {
    res.status(200).send("It worked!")

  } catch (error) {
    res.status(400).send(error)

  }
})

app.listen(port)
require("dotenv").config()
const cors = require("cors")
const express = require("express")
const mongoose = require("mongoose")

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// DATABASE CONNECTION
mongoose.connect(process.env.DATABASE_URL)
  .then(() => app.listen(port))
  .catch(err => console.log(err.message))

// USER ROUTE
const userRouter = require('./routes/users')
app.use('/api/users', userRouter)

// VARSITY ROUTE
const varsityRouter = require('./routes/varsity')
app.use('/api/varsities', varsityRouter)
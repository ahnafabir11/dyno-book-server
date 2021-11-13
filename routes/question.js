const express = require('express');
const router = express.Router();

const QuestionModel = require('../schema/questionSchema')


// get all questions 
router.get('/', async (req, res) => {
  try {
    const questions = await QuestionModel.find()
    const result = { data: questions, response: {} }
    res.status(200).send(result)

  } catch (error) {
    const result = { data: [], response: { message: error.message } }
    res.status(500).send(result)
  }
})


// add new question
router.post('/add', async (req, res) => {
  const questionInfo = req.body;

  try {
    const question = new QuestionModel({
      varsityName: questionInfo.varsityName,
      accYear: questionInfo.accYear,
      unit: questionInfo.unit,
      question: questionInfo.question,
      options: questionInfo.options,
      answer: questionInfo.answer,
      explanation: questionInfo.explanation,
      category: questionInfo.category
    })

    const newQuestion = await question.save()
    const result = { data: newQuestion, response: { message: "question added successfully" } }
    res.status(201).send(result)

  } catch (error) {
    console.log(error.message);
    const result = { data: [], response: { message: error.message } }
    res.status(500).send(result)
  }
})

module.exports = router;
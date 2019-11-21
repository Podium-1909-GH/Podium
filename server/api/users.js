const router = require('express').Router()
const {User, Speech} = require('../db/models')
module.exports = router

router.post('/:userId/speeches', async (req, res, next) => {
  try {
    const speech = await Speech.create({
      transcript: req.body.transcript,
      length: req.body.length,
      userId: req.params.userId
    })
    res.status(201).send(speech)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

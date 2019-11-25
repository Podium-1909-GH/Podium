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
    res.status(201).json(speech)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

router.get('/:userId/speeches', async (req, res, next) => {
  try {
    const speeches = await Speech.findAll({where: {userId: req.params.userId}})
    res.status(200).json(speeches)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

router.get('/:userId/speeches/:speechId', async (req, res, next) => {
  try {
    const speech = await Speech.findByPk(req.params.speechId)
    res.status(200).send(speech)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

router.put('/:userId', async (req, res, next) => {
  try {
    const user = await User.update(req.body, {
      where: {
        id: req.params.userId
      }
    })
    res.json(user[0])
  } catch (err) {
    console.error(err)
  }
})

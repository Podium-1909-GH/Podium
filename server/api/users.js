const router = require('express').Router()
const {User, Speech} = require('../db/models')
module.exports = router

const isMe = (req, res, next) => {
  if (Number(req.user.id) === Number(req.params.userId)) {
    next()
  } else {
    res.status(403).send('User not authorized.')
  }
}

router.post('/:userId/speeches', isMe, async (req, res, next) => {
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

router.get('/:userId/speeches', isMe, async (req, res, next) => {
  try {
    const speeches = await Speech.findAll({where: {userId: req.params.userId}})
    res.status(200).json(speeches)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

router.get('/:userId/speeches/:speechId', isMe, async (req, res, next) => {
  try {
    const speech = await Speech.findByPk(req.params.speechId)
    res.status(200).send(speech)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

router.put('/:userId', isMe, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    const updatedUser = await user.update({
      firstName: req.body.firstName,
      lastName: req.body.lastName
    })
    res.status(200).json(updatedUser)
  } catch (err) {
    console.error(err)
  }
})

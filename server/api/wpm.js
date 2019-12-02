const router = require('express').Router()
const {WPM} = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
module.exports = router

router.get('/:wpm', async (req, res, next) => {
  try {
    let pace = Number(req.params.wpm)
    const wpm = await WPM.findOne({
      where: {
        min: {[Op.lte]: pace},
        max: {[Op.gt]: pace}
      }
    })
    console.log(wpm)
    res.status(200).json(wpm)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

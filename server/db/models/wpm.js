const Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('../db')

const WPM = db.define('wpm', {
  min: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  max: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

module.exports = WPM

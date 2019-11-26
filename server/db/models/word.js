const Sequelize = require('sequelize')
const db = require('../db')

const Word = db.define('word', {
  value: {
    type: Sequelize.STRING,
    allowNull: false,
    validations: {
      notEmpty: true
    }
  },
  children: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false
  }
})

module.exports = Word

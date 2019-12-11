const Sequelize = require('sequelize')
const db = require('../db')

const Word = db.define('word', {
  value: {
    //the filler word or first word if the filler "word" contains more than one word
    type: Sequelize.STRING,
    allowNull: false,
    validations: {
      notEmpty: true
    }
  },
  children: {
    //the second word if the filler "word" contains more than one word
    //ex. "i mean" and "i guess" are both considered filler "words"
    //this word will have value = "i" and children = ["mean", "guess"]
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false
  },
  isDefault: {
    //default words are set by the site creators, not by users
    type: Sequelize.BOOLEAN,
    default: false
  }
})

module.exports = Word

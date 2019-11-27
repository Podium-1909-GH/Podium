/* eslint-disable complexity */
const Sequelize = require('sequelize')
const db = require('../db')
const Sentiment = require('sentiment')
const sentiment = new Sentiment()
const Word = require('./word')

const Speech = db.define('speech', {
  length: {
    //in seconds
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    },
    allowNull: false
  },
  transcript: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  fillerObj: {
    type: Sequelize.TEXT
  },
  wpm: {
    //words per minute
    type: Sequelize.INTEGER
  },
  numberFiller: {
    type: Sequelize.INTEGER
  },
  sentiment: {
    type: Sequelize.TEXT
  }
})

async function getFillerWords() {
  const defaultFillers = await Word.findAll({where: {isDefault: true}})
  const reducedObj = defaultFillers.reduce((accum, word) => {
    if (word.children.length > 0) {
      word.children.forEach(child => {
        accum[word.value + ' ' + child] = []
      })
    } else {
      accum[word.value] = []
    }
    return accum
  }, {})

  const wordChildren = defaultFillers.reduce((accum, word) => {
    accum[word.value] = word.children
    return accum
  }, {})
  return [reducedObj, wordChildren]
}

Speech.beforeCreate(async speech => {
  const fillerWordsArr = await getFillerWords()
  const fillerObj = fillerWordsArr[0]
  const fillerWordsChildren = fillerWordsArr[1]

  let transcriptArr = speech.transcript.split(' ')
  speech.wpm = Math.round(transcriptArr.length / speech.length * 60)
  let count = 0
  let fillerIndices = transcriptArr.reduce((accum, word, index) => {
    if (fillerWordsChildren.hasOwnProperty(word)) {
      if (fillerWordsChildren[word].length > 0) {
        fillerWordsChildren[word].forEach(child => {
          if (transcriptArr[index + 1] === child) {
            accum[word + ' ' + child].push(index)
            count++
          }
        })
      } else {
        accum[word].push(index)
        count++
      }
    }
    return accum
  }, fillerObj)
  speech.numberFiller = count
  speech.fillerObj = JSON.stringify(fillerIndices)
  let sentimentObj = sentiment.analyze(speech.transcript)
  speech.sentiment = JSON.stringify(sentimentObj)
})

module.exports = Speech

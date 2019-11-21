const Sequelize = require('sequelize')
const db = require('../db')
const fillerWords = require('../../../utils/fillerwords')
const Sentiment = require('sentiment')
const sentiment = new Sentiment()

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

const fillerObj = {
  like: [],
  'i mean': [],
  well: [],
  'you know': [],
  whatever: [],
  basically: [],
  literally: [],
  totally: [],
  okay: [],
  ok: [],
  'you see': [],
  clearly: [],
  obviously: [],
  'come on': [],
  right: []
}

Speech.beforeCreate(speech => {
  let transcriptArr = speech.transcript.split(' ')
  speech.wpm = Math.round(transcriptArr.length / speech.length * 60)
  let count = 0
  let fillerIndices = transcriptArr.reduce((accum, word, index) => {
    if (accum.hasOwnProperty(word)) {
      accum[word].push(index)
    } else if (word === 'i') {
      if (transcriptArr[index + 1] === 'mean') {
        accum[word + ' ' + transcriptArr[index + 1]].push(index)
        count++
      }
    } else if (word === 'you') {
      if (
        transcriptArr[index + 1] === 'know' ||
        transcriptArr[index + 1] === 'see'
      ) {
        accum[word + ' ' + transcriptArr[index + 1]].push(index)
        count++
      }
    } else if (word === 'come') {
      if (transcriptArr[index + 1] === 'on') {
        accum[word + ' ' + transcriptArr[index + 1]].push(index)
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

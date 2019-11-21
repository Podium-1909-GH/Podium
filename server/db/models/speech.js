const Sequelize = require('sequelize')
const db = require('../db')
const fillerWords = require('../../../utils/fillerwords')

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
      isEmpty: false
    }
  },
  wpm: {
    //words per minute
    type: Sequelize.INTEGER
  },
  numberFiller: {
    type: Sequelize.INTEGER
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
  let fillerCount = transcriptArr.reduce((accum, word, index) => {
    if (accum.hasOwnProperty(word)) {
      accum[word].push(index)
    } else if (word === 'i') {
      if (transcriptArr[index + 1] === 'mean') {
        accum[word].push(index)
      }
    } else if (word === 'you') {
      if (
        transcriptArr[index + 1] === 'know' ||
        transcriptArr[index + 1] === 'see'
      ) {
        accum[word].push(index)
      }
    } else if (word === 'come') {
      if (transcriptArr[index + 1] === 'on') {
        accum[word].push(index)
      }
    }
    return accum
  }, fillerObj)
})

module.exports = Speech

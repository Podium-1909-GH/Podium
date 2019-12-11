/* eslint-disable complexity */
const Sequelize = require('sequelize')
const db = require('../db')
const Sentiment = require('sentiment')
const sentiment = new Sentiment()
const Word = require('./word')

const Speech = db.define('speech', {
  length: {
    //length of speech in seconds
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    },
    allowNull: false
  },
  transcript: {
    //string result of transcribed speech from web speech API
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  fillerObj: {
    //stringified object containing filler words as keys and arrays of the
    //indicies where those filler words take place in the speech as values
    type: Sequelize.TEXT
  },
  wpm: {
    //words per minute
    type: Sequelize.INTEGER
  },
  numberFiller: {
    //total count of filler words in a speech
    type: Sequelize.INTEGER
  },
  sentiment: {
    //stringified version of whole sentiment object
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

//before adding the speech to the database, calculate its stats
Speech.beforeCreate(async speech => {
  const fillerWordsArr = await getFillerWords()
  const fillerObj = fillerWordsArr[0]
  const fillerWordsChildren = fillerWordsArr[1]

  let transcriptArr = speech.transcript.split(' ')

  //calculate words per minute
  speech.wpm = Math.round(transcriptArr.length / speech.length * 60)

  //use count to sum the number of filler words
  let count = 0

  //find the indices of each filler word in the speech
  let fillerIndices = transcriptArr.reduce((accum, word, index) => {
    //if the current word is a word in the filler words object
    if (fillerWordsChildren.hasOwnProperty(word)) {
      //if the matching word in the filler words object has children
      if (fillerWordsChildren[word].length > 0) {
        //loop through each child to check if the next word in the transcript is
        //one of the children
        fillerWordsChildren[word].forEach(child => {
          //if the next word in the transcript is one of the children
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

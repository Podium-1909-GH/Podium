const User = require('./user')
const Speech = require('./speech')
const Word = require('./word')
const WPM = require('./wpm')

// make associations
// export models so they can be accessed via db/models

User.hasMany(Speech)
Speech.belongsTo(User)
Word.hasMany(User)
User.belongsToMany(Word, {through: 'UserWord'})

module.exports = {
  User,
  Speech,
  Word,
  WPM
}

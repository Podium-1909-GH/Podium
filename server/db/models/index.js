const User = require('./user')
const Speech = require('./speech')
const Word = require('./word')
const WPM = require('./wpm')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

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

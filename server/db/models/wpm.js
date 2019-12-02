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

// WPM.getWPMInfo = function (pace) {
//   const wpmInfo = WPM.findOne({
//     where:{
//       min: {[Op.lte]:pace},
//       max: {[Op.gt]:pace}
//   }})
//   console.log(wpmInfo)
//   return wpmInfo
// }

module.exports = WPM

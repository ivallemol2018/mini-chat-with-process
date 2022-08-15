const mongoose = require('mongoose')

const usersModel = mongoose.model('users', mongoose.Schema({
  username: { type: String, require: true, max: 250 },
  password: { type: String, require: true, max: 250 }
}))

module.exports = usersModel
const ContenedorMongoose = require('../../contenedores/ContenedorMongoose')
const options = require('../../connection/mongoose')
const usersModel = require('./models/usersModel')

class UserDaoMongoose extends ContenedorMongoose {
  constructor() {
    super(options, usersModel)
  }

  async getByCriteria(criteria) {
    const users = await super.getByCriteria(criteria)
    return users
  }  
}

module.exports = UserDaoMongoose
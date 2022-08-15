const keys = require('../config/keys');
const MessageDaoFile = require('./messages/MessageDaoFile')
const UserDaoMongoose = require('./users/UserDaoMongoose')

class DaoFactory {

  static getMessage() {
    switch (keys.driverClassName) {
      case 'file':
        return new MessageDaoFile();
    }
  }

  static getUser() {
    return new UserDaoMongoose();
  }  

}

module.exports = DaoFactory
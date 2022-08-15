const keys = require('../config/keys');

const options = {
  connection: {
    URL: keys.dbManagment
  },
  useNewUrlParser: true,
  useUnifiedTopology: true
}

module.exports = options
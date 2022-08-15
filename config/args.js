const yargs = require('yargs')(process.argv.slice(2))

const argv = yargs
  .default({
    PORT: '8080'
  })
  .alias({
    p: 'PORT'
  })
  .argv

module.exports = argv
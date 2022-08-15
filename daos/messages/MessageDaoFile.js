const ContenedorFile = require('../../contenedores/ContenedorFile')

class MessageDaoFile extends ContenedorFile{
  constructor(){
    super('DB/messages.json')
  }

}

module.exports = MessageDaoFile
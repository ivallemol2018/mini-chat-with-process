const DaoFactory = require('../daos/DaoFactory')

const messages = DaoFactory.getMessage()

const getAll = async () => {
  try{
    return await messages.getAll()
  }catch(error){
    throw 'There was an error trying to get all messages'
  }
}

const getById = async id => {
  try{
    return await messages.getById(id)
  }catch(error){
    throw 'There was an error trying to get the message by id'
  }
}

const save = async message =>{
  try{
    return await messages.save(message.toJSON())

  }catch(error){
    throw 'There was an error trying to save the message'
  }  
}

const deleteById = async id =>{
  try{
    return await messages.deleteById(id)
    
  }catch(error){
    throw 'There was an error trying to delete the message'
  }
}

const update = async message =>{
  try{
    return await messages.update(message)
  }catch(error){
    throw 'There was an error trying to update the message'
  }  
}

module.exports = {
  getAll,
  getById,
  save,
  deleteById,
  update
}
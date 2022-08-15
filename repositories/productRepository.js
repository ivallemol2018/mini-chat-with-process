const Storage = require('../utils/Storage')
const connection = require('../connection/mariadb')
const {faker} = require('@faker-js/faker')

const products = new Storage(connection)

products.setSource('productos')

const getAll = async () => {
  try{
    return await products.getAll()
  }catch(error){
    throw 'There was an error trying to get all products'
  }
}

const getRandom = async () => {
  try{
    const products = []
    for(let i=0; i < 5; i++)
      products.push(createMockProduct())
    
    return products
  }catch(error){
    throw 'There was an error trying to get products random'
  }
}



const getById = async id => {
  try{
    return await products.getById(id)
  }catch(error){
    throw 'There was an error trying to get the product by id'
  }
}

const save = async product =>{
  try{
    return await products.save(product.toJSON())
  }catch(error){
    throw 'There was an error trying to save the product'
  }  
}

const deleteById = async id =>{
  try{
    return await products.deleteById(id)
  }catch(error){
    throw 'There was an error trying to delete the product'
  }
}

const update = async product =>{
  try{
    return await products.update(product)
  }catch(error){
    throw 'There was an error trying to update the product'
  }  
}

function createMockProduct(){
  return{
    title: faker.commerce.product(),
    price : faker.commerce.price(),
    thumbnail : faker.image.business(100,100,true)
  }

}

module.exports = {
  getAll,
  getById,
  save,
  deleteById,
  update,
  getRandom
}
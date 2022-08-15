const mongoose = require('mongoose')

class ContenedorMongoose {

  constructor(options,model) {

    mongoose.connect(options.connection.URL,model)

    this.model = model
  }

  async getAll() {
    return await this.model.find({})
  }

  async deleteById(id) {
    return await this.model.deleteOne({_id: mongoose.Types.ObjectId(id)})
  }

  async deleteAll() {
    //const res = await this.knex(this.table)
    return null //res
  }

  async getById(id) {
    return await this.model.find({_id: mongoose.Types.ObjectId(id)})
  }

  async getByCriteria(criteria) {
    return await this.model.findOne(criteria)
  }

  async save(item) {
    const response = new this.model(item)
    return await response.save()
  }

  async update(item) {
    return await this.model.updateOne(
      {_id: mongoose.Types.ObjectId(item.id)},
      {$set: item}
    )
  }

}

module.exports = ContenedorMongoose;
const fs = require('fs')
const { normalize, denormalize, schema } = require('normalizr')

const authorSchema = new schema.Entity('author', {}, { idAttribute: 'email'})
const postSchema = new schema.Entity('post',{
  author: authorSchema
})
const postsSchema = new schema.Entity('posts',{"mensajes":[postSchema]})

class ContenedorFile {

  constructor(filename) {
    this.filename = filename;
  }

  async write(items) {
    try {
      if (items instanceof Object) {

        await fs.promises.writeFile(this.filename, JSON.stringify(items))
        return
      }
    }
    catch (err) {
      console.log(`error try saved ${this.filename} - description error :  ${error}`)
    }
  }

  async read() {
    try {
      const data = await fs.promises.readFile(this.filename, 'utf-8');
      
      return data ? JSON.parse(data) : null;
    }
    catch (err) {
      if (err.code === 'ENOENT') {
        return null;
      } else {
        console.log(`error trying read file ${this.filename}`)
      }
    }
  }

  getMaxId(items) {
    const length = items.length;

    if (length < 1) return 1

    return items[length - 1].id + 1;
  }

  async getAll() {
    return await this.read();
  }

  async deleteById(id) {
    const items = await this.read();
    const idx = items.findIndex(p => p.id == id)
    items.splice(idx, 1)

    await this.write(items)
  }

  async deleteAll() {
    await this.write([])
  }

  async getById(id) {
    const items = await this.read();
    return items.find(p => p.id == id)
  }

  async save(item) {
    const timestamp = new Date(Date.now()).toLocaleDateString() + " " + new Date(Date.now()).toLocaleTimeString();
    const normalizedData = await this.read();
    let posts = normalizedData ? denormalize(normalizedData.result,postsSchema,normalizedData.entities) : normalizedData

    const items = posts ? posts.mensajes : []

    let newItem;

    if (typeof item.id === 'undefined') {
      const id = this.getMaxId(items);
      newItem = { id, timestamp, ...item }
      items.push({ id, timestamp, ...item });
    } else {
      const idx = items.findIndex(p => p.id == item.id)
      newItem = item;
      items.splice(idx, 1, newItem) 
    }

    posts = {id: "mensajes", mensajes: items}

    const normalizedItems = normalize(posts, postsSchema)

    await this.write(normalizedItems);

    return newItem;
  }

  async update(item) {
    const timestamp = new Date(Date.now()).toLocaleDateString() + " " + new Date(Date.now()).toLocaleTimeString();
    const normalizedData = await this.read();

    const items = denormalize(normalizedData.result,[postSchema],normalizedData.entities)

    let newItem;

    if (typeof item.id === 'undefined') {
      const id = this.getMaxId(items);
      newItem = { id, timestamp, ...item }
      items.push({ id, timestamp, ...item });
    } else {
      const idx = items.findIndex(p => p.id == item.id)
      newItem = item;
      items.splice(idx, 1, newItem)
    }

    const normalizedItems = normalize(items, [postSchema])

    await this.write(normalizedItems);

    return newItem;
  }

}

module.exports = ContenedorFile;
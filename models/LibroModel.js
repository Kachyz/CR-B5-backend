const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LibrosSchema = new Schema({
  titulo: {type: String, required: true},
  descripcion: String,
  anio: Number
})

module.exports = mongoose.model('book', LibrosSchema)

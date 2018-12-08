const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const LibroModel = require('../models/LibroModel')

router.use(bodyParser.json())

let libros = []

/**
 * {
 *    titulo: String,
 *    descripcion:  String,
 *    Anio:   Number
 * }
 */

router.get('/', (req, res) => {
    
    LibroModel.find({}, (err, docs) => {
      res.send(docs)
    })
    // res.send(libros)
})

router.post('/', (req, res) => {
  console.log(req.body)

  let libroNuevo = new LibroModel(req.body)
  libroNuevo.save()

  res.send(libroNuevo)
})

router.delete('/', (req, res) => {
  let index = -1;
  for(let i=0; i < libros.length; i++) {
      if(libros[i].titulo == req.body.titulo) index = i;
  }
  if (index < 0)
      res.status(400).send('Book not found')
  else {
      libros.splice(index, 1)
      res.status(200).send(libros)
  }
})

router.put('/', (req, res) => {

  LibroModel.findOneAndUpdate({"titulo": "HP 5000"},    //1er param, condiciones de busqueda
                              {"titulo": "Debe ser el ultimo"},   //2do param, Update solicitado
                              (err, libro) => {
                                if(err) res.status(400).send('Book not found')
                                else res.status(200).send('Updated "' + libro.titulo + '"')
                              })
  // res.send('Elemento actualizado')
})

//   let index = -1;
//   for(let i=0; i < libros.length; i++) {
//       if(libros[i].titulo == req.body.titulo) index = i;
//   }
//   if (index < 0)
//       res.status(400).send('Book not found')
//   else {
//       libros[index] = req.body
//       res.status(200).send(libros)
//   }
// })



module.exports = router
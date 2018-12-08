const express = require('express')
const app = express()
const cors = require('cors')
const librosImportados = require('./routes/libros')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/libreria')

app.use(cors())

mongoose.connection.once('open', () => {
  console.log("Me pude conectar a la BD :D")
}).on('error', () => {
  console.log("No me pude conectar :(")
})

app.use('/libros', librosImportados)

let books = [2,500,6,8,10]

app.get('/', (request, response) => {
  console.log('Recibimos una peticion GET al /')
  response.send(books)
})

app.get('/books', (req, res) => {
  res.send(books)
})

app.get('/:pos', (req, res) => {
  console.log("Estoy en el GET /:pos");
  let miPos = req.params.pos
  console.log(`recibimos pos = ${books[miPos]}`)
  res.status(200).send(''+books[miPos])
  // res.send(''+books[miPos])
})



app.post('/id=3', (req, res) => {
  console.log('enviando correo')
  res.send('correo electronico de usuario')
}
)


// server.listen(5000, () => {
//   console.log('Comenzamos a correr en el puerto 5000')
// })
app.listen(5000, () => {
  console.log('Comenzamos a correr en el puerto 5000')
})

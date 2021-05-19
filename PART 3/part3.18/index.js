const express = require('express')
const app = express()
var morgan = require('morgan')
app.use(express.json())
const cors = require('cors')
app.use(cors())

const Person = require('./models/person.js')

app.get('/api/persons', (req, res) => {
    Person.find({}).then(result => {
        res.json(result)
    })
})
app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findById(req.params.id).then(person =>{
      if(person){
          res.json(person)
      }
      else{
          response.status(404).end()
      }
  })
  .catch(error =>next(error))
})
  
  
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
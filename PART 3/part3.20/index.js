const express = require('express')
const app = express()
var morgan = require('morgan')
app.use(express.json())
const cors = require('cors')
app.use(cors())

const Person = require('./models/person.js')

var uniqueValidator = require('mongoose-unique-validator');

const personSchema = new mongoose.Schema({
  name: {
    type:String, 
    required: true
  },
  number: {
    type:Number, 
    required: true
  }
})

personSchema.plugin(uniqueValidator);
app.get('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    Person.findById(req.params.id).then(person =>{
        res.json(person)
    })
    .catch(error => res.status(404).end())
})
  
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
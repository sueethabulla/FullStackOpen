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
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const person = {
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true})
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.use(errorHandler)
  
  
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
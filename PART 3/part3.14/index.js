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
app.post('/api/persons', (request, response) => {
  const body = request.body
  // console.log(body)

  if (!body.name) {
      return response.status(400).json({
          error: 'name missing'
      })
  }

  if (!body.number) {
      return response.status(400).json({
          error: 'number missing'
      })
  }

  ///
  Person.find({}).then(persons => {
      console.log('persons: ', persons)

      if (persons.some(person => person.name === body.name)) {
          console.log("name must be unique")
          return response.status(400).json({
              error: 'name must be unique'
          })
      }

       let person = new Person(  {
          name: body.name,
          number: body.number
      })
           // id: generateId(),
  
      // save in mongod DV
      person.save().then(savedPerson => {
          console.log('savedPerson', savedPerson)
          response.json(savedPerson)
      })
  })
})

  
  
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
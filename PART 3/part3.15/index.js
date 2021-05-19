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

const deletePerson = (personToBeDeleted) => {

  console.log('delete: ',personToBeDeleted._id )
  if(window.confirm(`Delete ${personToBeDeleted._id}`)){
    personeService
    .deleteObjectById(personToBeDeleted._id)
    .then(
      setPersons(persons.filter((person) => person['_id'] !== personToBeDeleted['_id']))
    )
    .then(
      setFilterText('')
    )
  }
}
  
  
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
const express = require('express')
const app = express()

let persons = [
  {
      "name": "Arto Hellas",
      "phone": "040-123456",
      "id": 1
    },
    {
      "name": "Martti Tienari",
      "phone": "040-123456",
      "id": 2
    },
    {
      "name": "Arto Järvinen",
      "phone": "040-123456",
      "id": 3
    },
    {
      "name": "Lea Kutvonen",
      "phone": "muutettu numero",
      "id": 4
    },
    {
      "name": "Unto Uusi",
      "phone": "040-1233 123123",
      "id": 5
    }
  ]

  app.get('/api/persons/:id', (req, res) =>{
    const id = req.params.id
    const person =  persons.find(person => {return person.id == id})
    console.log(person)

    if(person){
        res.json(person)
    }
    else{
        res.status(404).end()
    }
})
  
  const port = 3001
  app.listen(port)
  console.log(`Server running on port ${port}`)
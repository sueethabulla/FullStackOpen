const express = require('express')
const app = express()
app.use(express.json())

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
  const generateId = () =>{
    const maxID = persons.length > 0
    ? Math.max( ...persons.map(n => n.id))
    : 0
    return maxID +1
}


app.post('/api/persons', (request, response) => {
  const body = request.body
  console.log(body)

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

  if(persons.some(person => person.name === body.name)){
      return response.status(400).json({ 
          error: 'name must be unique' 
        })

  }

  let person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(person)
})
  app.get('/api/persons', (req, res) =>{
    res.json(persons)
})
  
  const port = 3001
  app.listen(port)
  console.log(`Server running on port ${port}`)
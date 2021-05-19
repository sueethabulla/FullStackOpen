const express = require('express')
const app = express()
var morgan = require('morgan')
app.use(express.json())
const cors = require('cors')
app.use(cors())
const baseUrl = 'http://localhost:3001/api/persons'

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

  morgan.token('ob', function (req, res) { 
    console.log("ob", req.body)
    return `${JSON.stringify(req.body)}` })

app.use(morgan(':method :url :status :response-time :req[header] :ob'))
  const generateId = () =>{
    const maxID = persons.length > 0
    ? Math.max( ...persons.map(n => n.id))
    : 0
    return maxID +1
}

  app.get('/', (req, res) =>{
    res.json(persons)
})
  
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
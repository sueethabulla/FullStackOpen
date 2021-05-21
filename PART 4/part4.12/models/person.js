const mongoose = require('mongoose')
const url = 'mongodb+srv://havilah:honey@cluster0.o9x9b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
console.log('connecting to', url)

// url  mongodb+srv://fullstack:<password>@cluster0.eusd4.mongodb.net/<dbname>?retryWrites=true&w=majority

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})


module.exports = mongoose.model('Person', personSchema)
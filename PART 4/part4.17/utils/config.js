require('dotenv').config()

const PORT = 3001
const MONGO_URI = 'mongodb+srv://havilah:honey@cluster0.o9x9b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

module.exports = {
  MONGO_URI,
  PORT,
}
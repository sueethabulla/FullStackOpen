const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')


const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = 'mongodb+srv://havilah:honey@cluster0.o9x9b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
var conn = mongoose.connection;
conn.on('connected', function() {
    console.log('database is connected successfully');
});

app.use(cors())
app.use(express.json())
app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})
app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})



const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
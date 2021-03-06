const { ApolloServer, UserInputError, AuthenticationError, gql, PubSub } = require('apollo-server')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

mongoose.set('useFindAndModify', false)

const MONGODB_URI = ''

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int
    id: ID!
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]
    allAuthors: [Author!]!
    me: User
  }
  type Mutation {
    addBook(
      title: String!
      author: String
      published: Int
      genres: [String]
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Subscription {
    bookAdded: Book!
  } 
`

const pubsub = new PubSub()

const resolvers = {
  Book: {
    author: async root => {
      const author = await Author.findOne({ _id: root.author })
      return {
        name: author.name,
        born: author.born,
      }
    }
  },
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      // filter missing
      if (args.genre) {
        return Book.find({ genres: { $in: [args.genre] } })
      }
      return Book.find({})
    },
    /*
    if (args.author && args.genre) {
      return (
        books
        .filter(book => book.author === args.author)
        .filter(book => book.genres.includes(args.genre))
      )
    } else if (args.author) {
      return books.filter(book => book.author === args.author)
    } else if (args.genre) {
      return books.filter(book => book.genres.includes(args.genre))
    }
    return books
  },*/
    allAuthors: () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Author: {
    bookCount: async (root, args) => {
      const books = await Book.countDocuments({ author: root.id })
      return books
    }
  },
  Mutation: {
    addBook: async (_, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('Not authenticated')
      }
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
        author = await author.save()
      }
      const book = new Book({ ...args, author: author.id})
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      return book
    },
    editAuthor: async (_, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('Not authenticated')
      }
      const author = await Author.findOne({ name: args.name })
      if (!author) return null
      author.born = args.setBornTo
      console.log(args)
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username })
      return user.save().catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if ( !user || args.password !== 'password' ) {
        throw new UserInputError('Wrong credentials')
      }
      const userForToken = {
        username: user.username,
        favoriteGenre: user.favoriteGenre,
        id: user._id,
      }
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
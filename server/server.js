require('dotenv').config()
const express = require('express')
const cors = require('cors')
const http = require('http')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const session = require('express-session')
var MemoryStore = require('memorystore')(session)

const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ['GET', 'POST']
    }
  })
//Routes & controllers
const users = require('./routes/users')
const auth = require('./routes/auth')
const socketController = require('./controllers/socketController')

//Middleware
app.use(helmet())
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:["http://localhost:3000"],
    methods: ["GET", "POST", 'PUT'],
    credentials: true
}))
const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    name: 'session',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 864000000
    },
    store: new MemoryStore({
        checkPeriod: 86400000
    })
})
app.use(sessionMiddleware)
io.use((socket, next) => {
    sessionMiddleware(socket.request, {}, next)    
})
io.on("connection", socketController.onConnect)
app.set('trust proxy', 1);

app.use('/api/users', users)
app.use('/auth', auth)

server.listen(8000 | process.env.PORT)
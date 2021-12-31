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
        methods: ["GET", "POST"],
        credentials: true
    }
  })
//Routes & controllers
const users = require('./routes/users')
const auth = require('./routes/auth')
const friends = require('./routes/friends')
const messages = require('./routes/messages')
const boards = require('./routes/boards')
const socketController = require('./controllers/socketController')

//Middleware
app.use(helmet())
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))
const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    name: 'session',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 864000000
    },
    store: new MemoryStore({
        checkPeriod: 86400000
    })
})
app.set('trust proxy', 1);
app.use(sessionMiddleware)
io.use((socket,next) => {
    sessionMiddleware(socket.request, socket.request.res, next)
})
io.on("connection",socketController.onConnect)
app.use('/api/users', users)
app.use('/api/friends', friends)
app.use('/api/messages', messages)
app.use('/api/boards', boards)
app.use('/auth', auth)
app.use(express.static('public'))

server.listen(8000 || process.env.PORT)
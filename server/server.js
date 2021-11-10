require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const session = require('express-session')
var MemoryStore = require('memorystore')(session)

const app = express()
const users = require('./routes/users')
const auth = require('./routes/auth')

app.use(helmet())
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:["http://localhost:3000"],
    methods: ["GET", "POST", 'PUT'],
    credentials: true
}))
app.use(session({
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
}))
app.set('trust proxy', 1);

app.use('/api/users', users)
app.use('/auth', auth)

app.listen(8000 | process.env.PORT)
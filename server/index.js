const express = require('express');
const {Server} = require('socket.io');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const server = require('http').createServer(app);
const authRouter = require('./Routers/authRouter');
const Redis = require('ioredis');

const session = require('express-session');
const RedisStore = require("connect-redis").default;
require('dotenv').config();


const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        credentials: "true",
    },
});

const redisClient = require('./redis');

app.use(helmet());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());
app.use(session({
    secret: process.env.COOKIE_SECRET,
    credentials: true,
    name: 'sid',
    store: new RedisStore({ client: redisClient }),
    resave: false,
    saveUninitialized: false,
    cookie:{
        secure: process.env.ENVIRONMENT === 'production' ? "true": "auto",
        httpOnly: true,
        sameSite: process.env.ENVIRONMENT === 'production' ? "none": "lax",
        expires: 1000 * 60 * 60 * 24 * 7
    }
}))
app.use('/auth', authRouter);

app.get('/', (req, res) => {
    res.json("helloo")
});


io.on('connect', (socket) => {});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
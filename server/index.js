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
const {wrap} = require('./Controllers/serverController');
const {corsConfig} = require('./Controllers/serverController');
require('dotenv').config();
const redisClient = require('./redis');
const {sessionMiddleware} = require('./Controllers/serverController');


const io = new Server(server, {
    cors: corsConfig,
});

app.use(helmet());
app.use(cors(corsConfig));
app.use(express.json());
app.use(sessionMiddleware)
app.use('/auth', authRouter);

app.get('/', (req, res) => {
    res.json("helloo")
});

io.use(wrap(sessionMiddleware))
io.on('connect', (socket) => {
    console.log(socket.request.session.user.username);
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const validateAdmin = require('./auth/validateAdmin');
const validateToken = require('./auth/validateToken')
const cors = require('cors');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./auth/auth-router');
const adminRouter = require('./routes/admin');
const sleepRouter = require('./routes/day_log');
const qualityRouter = require('./routes/quality_log');
const weekRouter = require('./routes/week_log');
const monthRouter = require('./routes/month_log')

const server = express();

server.use(logger('dev'));
server.use(cors({
  origin: ['http://localhost:3000', 'https://sleep-tracker-backend.herokuapp.com'],
  credentials: true,
}));
server.use(express.json());
server.use(express.urlencoded({extended: false}));
server.use(cookieParser());
server.use(express.static(path.join(__dirname, 'public')));

server.use('/', indexRouter);
server.use('/auth', authRouter);
server.use('/users', validateToken(), usersRouter);
server.use('/admin', validateAdmin(), adminRouter);
server.use('/day', validateToken(), sleepRouter);
server.use('/month', validateToken(), monthRouter);
server.use('/week', validateToken(), weekRouter);
module.exports = server;

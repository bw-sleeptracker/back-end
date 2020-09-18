const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const validateAdmin = require('./auth/validateAdmin');
const validateToken = require('./auth/validateToken')


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./auth/auth-router');
const adminRouter = require('./routes/admin');
const sleepRouter = require('./routes/sleep_log');
const qualityRouter = require('./routes/quality_log');
const weekRouter = require('./routes/aggregate_week_data');
const monthRouter = require('./routes/aggregate_month_data')

const server = express();

server.use(logger('dev'));
server.use(express.json());
server.use(express.urlencoded({extended: false}));
server.use(cookieParser());
server.use(express.static(path.join(__dirname, 'public')));

server.use('/', indexRouter);
server.use('/auth', authRouter);
server.use('/users', validateToken(), usersRouter);
server.use('/admin', validateAdmin(), adminRouter);
server.use('/sleep', validateToken(), sleepRouter);
// server.use('/quality', validateToken(), qualityRouter);
// server.use('./week', validateToken(), weekRouter);
// server.use('./month', validateToken(), monthRouter);

module.exports = server;

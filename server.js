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

module.exports = server;

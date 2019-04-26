const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('../routes/auth/auth-router.js');
const usersRouter = require('../routes/users/users-router.js');
const howtoRouter = require('../routes/howto/howto-router.js');
const stepsRouter = require('../routes/steps/steps-router.js');
const reviewsRouter = require('../routes/reviews/reviews-router.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);
server.use('/api/howto', howtoRouter); 
server.use('/api/steps', stepsRouter);
server.use('/api/reviews', reviewsRouter);

module.exports = server;
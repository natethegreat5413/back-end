const express = require('express');

const restricted = require('../auth/auth-middleware.js');
const authRouter = require('../auth/auth-router.js');

const server = express();

server.use(express.json());

server.use('/api/auth', authRouter);

// once user is authenticated, can check that the api is up at localhost:5001/
server.get('/', restricted, (req, res) => {
    res.json({
        api: 'up'
    });
});

module.exports = server;

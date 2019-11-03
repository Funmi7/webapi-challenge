const express = require('express');
const router = require('./routers/projectRouter');
const actionRouter = require('./routers/actionRouter');

const server = express();

server.use(express.json());
server.use(logger);

server.use('/api/projects', router);
server.use('/api/projects', actionRouter);

//logger middleware
function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url})}`
  )
  next();
};

server.get('/', (req, res) => {
    res.send(`Server up and running!`);
  });

module.exports = server;
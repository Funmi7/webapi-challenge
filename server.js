const express = require('express');

const server = express();

server.use(express.json());

// server.use('/api/projects');

server.get('/', (req, res) => {
    res.send(`Server up and running!`);
  });

module.exports = server;
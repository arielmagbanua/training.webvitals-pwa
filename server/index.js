const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// routes
const publicRoutes = require('./routes/public');

const serverApp = express();

// parse request body
serverApp.use(bodyParser.urlencoded({extended: false}));

// set a static directory
serverApp.use(express.static(path.join(__dirname, '../dist/public')));

serverApp.use(publicRoutes);

const server = serverApp.listen(process.env.port || 8080, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`App listening at https://${host}:${port}`);
});

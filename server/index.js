const express = require('express');
const bodyParser = require('body-parser');
const handlebars  = require('express-handlebars');

const path = require('path');

// for json server
const jsonServer = require('json-server');
const apiRouter = jsonServer.router(path.join(__dirname, 'database/db.json'));

const serverApp = express();

// sets the engine and configuration.
serverApp.set('view engine', 'hbs');

const hbs = handlebars.create({
  layoutsDir: path.join(__dirname, '../src/views/layouts'),
  // partialsDir: path.join(__dirname, '../src/views/partials'),
  // defaultLayout: 'index',
  extname: 'hbs'
});
serverApp.engine('hbs', hbs.engine);

serverApp.set('views', path.join(__dirname, '../src/views'));

// routes
const publicRoutes = require('./routes/public');

// parse request body
serverApp.use(bodyParser.urlencoded({extended: false}));

// set a static directory
serverApp.use(express.static(path.join(__dirname, '../dist/public')));

serverApp.use(publicRoutes);

// json server routes
serverApp.use('/api', apiRouter);

const server = serverApp.listen(process.env.port || 8080, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`App listening at https://${host}:${port}`);
});

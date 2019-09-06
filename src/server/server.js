const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const mongodb = require("../config/mongodb");


var server = null;

function start(api, callback) {
  const app = express();
  app.use(morgan('dev'));
// Lib para proteção básica de serviços rest
  app.use(helmet());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  // CORS para liberar o acesso de origens diferentes do server
  app.use(function (req, res, next) {
    const origin = req.headers.origin;

    res.header("Access-Control-Allow-Origin", origin ? origin : "");
    res.header("Vary", "Origin");
    res.header("Access-Control-Max-Age", "3600");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
    res.header("Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, " + "X-CSRF-TOKEN");

    next();
  });
  app.use((err, req, res, next) => {
    callback(new Error('Something went wrong!, err:' + err), null);
    res.status(500).send('Something went wrong!');
  })

  // Inicia todas as APIs que foram transferidas para o Server, mantendo uma unica instancia do mongodb compartilhada entre as APIs
  for (var i = 0; i < api.length; i++) {
    api[i](app, mongodb);
  }

  // Inicia o servico rest na porta em env.PORT
  server = app.listen(parseInt(process.env.PORT), () => callback(null, server));
}

function stop() {
  if (server) {
    mongodb.disconnect();
    server.close();
  };
  return true;
}

module.exports = {
  start,
  stop
}
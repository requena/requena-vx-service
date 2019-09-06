/* Arquivo utilizado apenas para inicializar as APIs no server */
require("dotenv-safe").config();
const server = require("./server/server");

const plano = require("./vx-plano/api/plano");
const tarifa = require("./vx-tarifa/api/tarifa");
const calculadora = require("./vx-calculadora/api/calculadora");

const api = [tarifa,plano,calculadora]
server.start(api, (err, app) => { 
    console.log("just started");
});

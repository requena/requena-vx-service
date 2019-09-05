require("dotenv-safe").config();

// Testes isolados
// require("./config/mongodb.test").runTests();
// require("./server/server.test").runTests();
// require("./vx-tarifa/repository/repository.test").runTests();
// require("./vx-plano/repository/repository.test").runTests();
// require("./vx-plano/api/plano.test").runTests();
// require("./vx-tarifa/api/tarifa.test").runTests();
// require("./vx-calculadora/api/calculadora.test").runTests();

// Testes integrados

 const test = require('tape');
 const server = require("./server/server");
 const listApi = [require("./vx-plano/api/plano"), require("./vx-tarifa/api/tarifa"), require("./vx-calculadora/api/calculadora")]
 const listApiTest = [require("./vx-plano/api/plano.test"), require("./vx-tarifa/api/tarifa.test"), require("./vx-calculadora/api/calculadora.test")]

 var app = null;
 server.start(listApi, (err, app) => {
     var pr = [];
     for (var i = 0; i < listApiTest.length; i++) {
         pr.push(new Promise(function (resolve, reject) {
             listApiTest[i].runIntegratedTests(app, test);
             setTimeout(resolve, 1000, true);
         }));
     }

     Promise.all(pr).finally(function () {
         server.stop();
     });
 })

require("dotenv-safe").config();

const repoPlano = require('./vx-plano/repository/repository');
const repoTarifa = require('./vx-tarifa/repository/repository');
const mongodb = require("./config/mongodb");
const planoData = require("./example/plano-data.json");
const tarifaData = require("./example/tarifa-data.json");

console.log('Iniciando Configuração');

repoPlano.connect(mongodb);
repoTarifa.connect(mongodb);

repoPlano.createCollection((err, result) => {
    repoTarifa.createCollection((err, result) => {

        var pr = [];


        planoData.forEach(plano => {
            pr.push(new Promise(function (resolve, reject) {
                repoPlano.savePlano(plano, (err, plano) => {
                    console.log('Plano Salvo ' + plano.result.ok);
                    resolve(true);
                });
            }));
        });


        tarifaData.forEach(tarifa => {
            pr.push(new Promise(function (resolve, reject) {
                repoTarifa.saveTarifa(tarifa, (err, tarifa) => {
                    console.log('Tarifa Salvo ' + tarifa.result.ok);
                    resolve(true);
                });
            }));
        });

        Promise.all(pr).finally(function () {
            setTimeout(function () {
                console.log('Configuração Concluida');
                repoPlano.disconnect();
                repoTarifa.disconnect();
            }, 1000, true);

        });
    })
})
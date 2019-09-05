const test = require('tape');
const repository = require('./repository');
const mongodb = require("../../config/mongodb");

function runTests() {
    repository.connect(mongodb);

    var id = null;
    var ddd = null;

    test('Repository GetAllTarifa', (t) => {
        repository.getAllTarifa((err, tarifas) => {
            if (tarifas && tarifas.length > 0) {
                id = tarifas[0]._id;

                if (tarifas[0].destino && tarifas[0].destino.length > 0) {
                    ddd = tarifas[0].destino[0].ddd;
                }
            }

            t.assert(!err && tarifas && tarifas.length > 0, "All Tarifas Returned");
            t.end();
        });
    })

    test('Repository GetTarifaByDdd', (t) => {
        if (!id) {
            t.assert(false, "Tarifa by Ddd Returned");
            t.end();
            return;
        }

        repository.getTarifaByDdd(id, (err, tarifa) => {
            t.assert(!err && tarifa, "Tarifa by Ddd Returned");
            t.end();
        });
    })

    test('Save Tarifa', (t) => {
        repository.saveTarifa({_id: 66}, (err, tarifa) => {
            t.assert(!err && tarifa, "Save Plano Returned");
            t.end();
        });
    })

    test('Repository Disconnect', (t) => {
        t.assert(repository.disconnect(), "Disconnect Ok");
        t.end();
    })
}

module.exports = {
    runTests
}
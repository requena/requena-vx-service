const test = require('tape');
const repository = require('./repository');
const mongodb = require("../../config/mongodb");

function runTests(){
    repository.connect(mongodb);
    var id = null;

    test('Repository GetAllPlano', (t) => {
        repository.getAllPlano((err, list) => {
            if(list && list.length > 0) id = list[0]._id;
            
            t.assert(!err && list && list.length > 0, "All Plano Returned");
            t.end();
        });
    })
    
    test('Repository GetPlanoById', (t) => {
        if(!id) {
            t.assert(false, "Plano by Id Returned");
            t.end();
            return;
        }

        repository.getPlanoById(id, (err, plano) => {
            t.assert(!err && plano, "Plano by Id Returned");
            t.end();
        });
    })

    test('Save Plano', (t) => {
        repository.savePlano({_id: 66}, (err, plano) => {
            t.assert(!err && plano, "Save Plano Returned");
            t.end();
        });
    })

    test('Repository Disconnect', (t) => {
        t.assert(repository.disconnect(), "Disconnect Ok");
        t.end();
    })
}

module.exports = { runTests }

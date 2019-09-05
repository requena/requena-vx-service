const testInterno = require('tape');
const supertest = require('supertest');
const plano = require('./plano');
const server = require("../../server/server");
const repository = require("../repository/repository");

const app = null;

function runTests(){
    server.start([plano], (err, app) => { 
        runIntegratedTests(app, testInterno);
        server.stop();
     })
}

function runIntegratedTests(app, test){
    var id = null;
    test('GET /plano', (t) => {
        supertest(app)
            .get('/plano')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) =>{
                if(res.body.value && res.body.value.length > 0) id = res.body.value[0]._id;
                t.error(err, 'No errors')
                t.assert(res.body && res.body.value.length > 0, "All Plano returned")
                t.end()  
            })
    })
    
    test('GET /plano/:id', (t) => {
        if(!id) {
            t.assert(false, "Plano by Id Returned");
            t.end();
            return;
        }
        supertest(app)
            .get('/plano/' + id)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) =>{
                t.error(err, 'No errors')
                t.assert(res.body, "Plano By Id returned")
                t.end()  
            })
    })

    repository.disconnect();
}

module.exports = { runTests, runIntegratedTests }

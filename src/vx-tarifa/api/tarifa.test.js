const testInterno = require('tape');
const supertest = require('supertest');
const tarifa = require('./tarifa');
const server = require("../../server/server");
const repository = require("../repository/repository");

function runTests() {
    server.start([tarifa], (err, app) => {
        runIntegratedTests(app, testInterno);
        server.stop();
    })
}

function runIntegratedTests(app, test) {
    var id = null;
    test('GET /tarifa', (t) => {
        supertest(app)
            .get('/tarifa')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (res.body.value && res.body.value.length > 0) id = res.body.value[0]._id;
                t.error(err, 'No errors')
                t.assert(res.body && res.body.value.length > 0, "All Tarifa returned")
                t.end()
            })
    })

    test('GET /tarifa/:id', (t) => {
        if (!id) {
            t.assert(false, "Tarifa by Ddd Returned");
            t.end();
            return;
        }
        console.log(id);
        supertest(app)
            .get('/tarifa/' + id)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                t.error(err, 'No errors')
                t.assert(res.body, "Tarifa By Ddd returned")
                t.end()
            })
    })
    repository.disconnect()
    return true;
}

module.exports = {
    runTests,
    runIntegratedTests
}
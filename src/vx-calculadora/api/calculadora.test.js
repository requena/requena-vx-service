const testInterno = require('tape');
const supertest = require('supertest');
const calculadora = require('./calculadora');
const server = require("../../server/server");

const app = null;

function runTests() {
    server.start([calculadora], (err, app) => {
        runIntegratedTests(app,testInterno);
        server.stop();
    })
}

function runIntegratedTests(app, test) {
    test('POST /calculadora', (t) => {
        supertest(app).post('/calculadora')
            .send({
                origem: 11,
                destino: 17,
                idPlano: 'falemais30',
                totalMinuto: 80
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (res.body) t.comment(res.body);
                t.error(err, 'No errors')
                t.assert(res.body, "resultado")
                t.assert(res.body, res.body.data)
                t.end()
            })
    })

}
module.exports = {
    runTests,
    runIntegratedTests
}
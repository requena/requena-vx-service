/* Foram feitos poucos testes, o que foi criado ficou a critério de exemplo.
Nesse caso outros testes poderiam ser implementados, como por ex:
-Validação dos tipos de entradas no objeto esperado pela função
-Validaçào do calculo
-Validação utilizando um arquivo CSV externo com todas as combinações possíveis e as utilizar de forma automática */
const testInterno = require('tape');
const supertest = require('supertest');
const calculadora = require('./calculadora');
const server = require("../../server/server");

const app = null;

/* Todos os métodos de runTests são utilizados nos testes isolados */
function runTests() {
    server.start([calculadora], (err, app) => {
        runIntegratedTests(app,testInterno);
        server.stop();
    })
}

/* Todos os métodos de runTests são utilizados nos testes integrados */
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
/* Este é o a unica API do projeto que faz uso de outras APIs internas.
Visando manter o app com capacidade de utilização em formato de microserviço
todas as chamadas as demais APIs são realizadas utilizando um endereço de Gateway, 
que inicia configurado como localhost porém pode ser facilmente transferido para um serviço como um nginx ou IIS */
const request = require('request');

function calcularTarifaAdicional(minutoGasto, minutoDisponivel, tarifaAdicional, tarifa) {
  var resultado = {
    semPlano: 0,
    comPlano: 0
  };
  resultado.semPlano = minutoGasto * tarifa;
  if (minutoGasto > minutoDisponivel)
    resultado.comPlano = (minutoGasto - minutoDisponivel) * (tarifa * (1 + tarifaAdicional));
  return resultado;
}

module.exports = (app) => {

  app.post('/calculadora', (req, res, next) => {
    try {
      const params = req.body;
      if (!params.origem || !params.idPlano || !params.destino || !params.totalMinuto) {
        res.status(422).send("Dados para calculo invalidos");
        return;
      }
      // Nesse ponto é feita a chamada para a API plano.js utilizando chamada HTTP externa, matendo as APIs desacopladas.
      request(process.env.GATEWAY_URL + '/plano/' + params.idPlano, (err2, res2, planoBody) => {
        if (err2) return next(err2);
        if (!planoBody) {
          res.status(404).send("Plano Inexistente");
          return;
        }
        var plano = JSON.parse(planoBody);
// Iden request de cima
        request(process.env.GATEWAY_URL + '/tarifa/' + params.origem, (err1, res1, tarifaBody) => {
          var tarifa = JSON.parse(tarifaBody);
          tarifa.destino.forEach(element => {
            if (element.ddd == params.destino) {
              res.json({
                resultado: calcularTarifaAdicional(params.totalMinuto, plano.minutos, plano.tarifa, element.valor)
              });
              res.status(200);
              return;
            }
          });
          return;
        })
      })
    } catch (e) {
      res.status(504);
    }
  });

}
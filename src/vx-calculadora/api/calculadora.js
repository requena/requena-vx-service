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
      request(process.env.GATEWAY_URL + '/plano/' + params.idPlano, (err2, res2, planoBody) => {
        if (err2) return next(err2);
        if (!planoBody) {
          res.status(404).send("Plano Inexistente");
          return;
        }
        var plano = JSON.parse(planoBody);

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
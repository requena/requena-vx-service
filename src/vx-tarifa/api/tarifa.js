module.exports = (app, mongo) => {

  const repository = require("../repository/repository");

  repository.connect(mongo);

  app.get('/tarifa', (req, res, next) => {
    repository.getAllTarifa((err, list) => {
      if (err) return next(err);
      res.json({value: list});
    });
  })

  app.get('/tarifa/:id', (req, res, next) => {
    repository.getTarifaByDdd(req.params.id, (err, tarifa) => {
      if (err) return next(err);
      if (!tarifa)
        res.status(404).json({});
      else
        res.json(tarifa)
    });
  })
}
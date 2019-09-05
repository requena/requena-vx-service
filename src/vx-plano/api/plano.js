module.exports = (app, mongo) => {

  const repository = require("../repository/repository");

  repository.connect(mongo);

  app.get('/plano', (req, res, next) => {
    repository.getAllPlano((err, list) => {
      if (err) return next(err);
      res.json({value: list});
    });
  })

  app.get('/plano/:id', (req, res, next) => {
    repository.getPlanoById(req.params.id, (err, plano) => {
      if (err) return next(err);
      if (!plano)
        res.status(404).json({});
      else
        res.json(plano);
    });
  })
}
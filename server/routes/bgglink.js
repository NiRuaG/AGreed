const router = require('express').Router();

router.use(
  (req, res, next) => {
    console.log(`\n\t\t@routes/bgglink ${req.method.toUpperCase()} on ${req.baseUrl}${req.path} (${req.originalUrl})`);
    next();
  }
);

router.route('/')
  .all((req, res, next) => {
    next();
  })

  //* GET
  .get((req, res) => {

  })

  //* POST
  .post((req, res) => {
    console.log(req.body);
    res.status(200).json(req.body);
  })

  ; // router.route('/')

module.exports = router;

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
    res.status(500).json({message: 'not implemented'});
  })

  //* POST
  .post((req, res) => {
    console.log(req.body);
    res.status(200).json(req.body);userXMLObj
  })

  ; // router.route('/')

module.exports = router;

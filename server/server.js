const express = require("express");

const PORT = process.env.PORT || 3001;
const app = express();

//* Middleware
app.use(
  require('morgan')('dev'), // Logging
  express.urlencoded({ extended: true }),
  express.json()
);

app.use('/bgglink', require('./routes/bgglink'));

app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}`);
});

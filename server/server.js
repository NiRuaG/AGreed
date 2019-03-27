const express = require("express");

const PORT = process.env.PORT || 3001;
const app = express();

//* Middleware
app.use(
    express.urlencoded({ extended: true }),
    express.json()
);

app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`);
});
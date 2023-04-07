const express = require("express");
const http = require("http");
// const routes = require("./routes/user.routes");
const cors = require("cors");
const index = require("./index");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 3000;
//Midlewares
app.use(express.json());
app.use(index); // todas la rutas de index.js
app.use(cors());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.listen(port, () => {
  console.log(`Escuchando en el puerto ${port}`);
  console.log(`http://localhost:${port}/`);
});

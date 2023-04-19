const express = require("express");
const cors = require("cors");
const index = require("./index");
const app = express();
require("dotenv").config();
const env = process.env.NODE_ENV  

const port = env === "dev" ? 4000 : process.env.PORT;
//Midlewares
app.use(cors());
app.use(express.json());
app.use(index); // todas la rutas de index.js
app.listen(port, () => {
  console.log(`Escuchando en el puerto ${port}`);
  console.log(`http://localhost:${port}/`);
});

const express = require("express");
const http = require("http");
// const routes = require("./routes/user.routes");
const cors = require("cors");
const index = require("./index");
const app = express();
require('dotenv').config()

const port = process.env.PORT || 4000;
//Midlewares
app.use(express.json());
app.use(cors());
app.use(index); // todas la rutas de index.js

const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {

  socket.on("respuesta", (data) => {
    console.log(data)
  });
   
});



 
server.listen(port, () => {
  console.log(`Escuchando en el puerto ${port}`);
  console.log(`http://localhost:4000/`);
});

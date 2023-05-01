// libreria de express
const express = require("express");
// Libreria de cors
const cors = require("cors");
// MIdlewares de las rutas para accede a cada una de ellas
const index = require("./index");
// Inicializacion de express
const app = express();
// Configuracion de variables de entorno
require("dotenv").config();
// Configuracion para ver si estamos en desarrollo o produccion
const env = process.env.NODE_ENV;
// Validacion para el puerto que se usara
const port = env === "dev" ? 4000 : process.env.PORT;
// Libreria de http
const http = require("http");
// servidor de http, le pasamos el app de express como argumento
const server = http.createServer(app);
// Desestructuracion de la libreria de socket.io
const { Server } = require("socket.io");
// Inicializacion de socket.io
const io = require("socket.io")(server, {
  cors: {
    origin: "http://127.0.0.1:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

//Midlewares
app.use(cors());
// se utiliza el formato json para el envio de datos
app.use(express.json());
// todas la rutas de index.js
app.use(index);

io.on("connection", (socket) => {
  socket.on("user", (user, idTest) => {
    console.log("Id del examen " + idTest);
    io.emit("server-newUserConnected", user);
  });
  // emit y on de administrador
  socket.on("admin-connected", (admin) => {
    console.log(`Administrador conectado ${admin.name}`);
  });
  // emit y on de las preguntas del examen
  socket.on("client-user-answer", ({ user, questionIndex, answerIndex }) => {
    console.log("Respuesta del usuario " + user.name);
    console.log("Indice de la pregunta " + questionIndex);
    console.log("Descripcion de la respuesta " + answerIndex.answer);
    io.emit("server-user-answer", { user, questionIndex, answerIndex });
  });

  // emit y on de las respuestas del usuario
  socket.on("client-user-disconnected", (user) => {
    console.log("usuario desconectado " + user.name);
    io.emit("server-user-disconnected", user);
  });
  socket.on("disconnect", () => {
    console.log("Usuario desconectado ");
  });
});

// Inicializacion del servidor con el puerto que deceamos
server.listen(port, () => {
  console.log(`Escuchando en el puerto ${port}`);
  console.log(`http://localhost:${port}/`);
});

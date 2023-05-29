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
const { addTestActive } = require("./controllers/test_controller");
// Inicializacion de socket.io
const io = require("socket.io")(server, {
  cors: {
    // origin: "http://127.0.0.1:5173",
    origin: "https://bright-torte-0b0c68.netlify.app",

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
    io.emit("server-newUserConnected", user);
  });
  // emit y on de administrador
  socket.on("clientAdmin-enable-test", (idTest) => {
    addTestActive(idTest);
  });
  // emit y on de las preguntas del examen
  socket.on("client-user-answer", ({ user, questionIndex, answerIndex }) => {
    io.emit("server-user-answer", { user, questionIndex, answerIndex });
  });
  socket.on("client-user-DoneTest", (data) => {
    io.emit("server-user-DoneTest", data);
  });
  // emit y on de las respuestas del usuario
  socket.on("client-user-disconnected", (user) => {
    io.emit("server-user-disconnected", user);
  });

  // Usuario ya participo en el examen
  socket.on("client-user-AlreadyDoneUserTest", (id) => {
    io.emit("server-user-AlreadyDoneUserTest", id);
  });

  socket.on("client-user-questionsAnswered", (data) => {
    io.emit("server-user-questionsAnswered", data);
  });

  socket.on("disconnect", () => {
    // console.log("Usuario desconectado ");
  });
});

// Inicializacion del servidor con el puerto que deceamos
server.listen(port, () => {
  console.log(`Escuchando en el puerto ${port}`);
  console.log(`http://localhost:${port}/`);
});

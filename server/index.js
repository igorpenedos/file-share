import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
import cors from "cors";

app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
  maxHttpBufferSize: 1e8,
});

io.on("connection", (socket) => {
  socket.on("join", (room) => {
    socket.join(room);
  });

  socket.on("send", (room, file, type, name) => {
    socket.to(room).emit("receive", file["0"], type, name);
  });
});

httpServer.listen(8080);

import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("aAuser connected", socket.id);

  socket.on("disconnect", () => {
    console.log("aAuser disconnected", socket.id);
  });
});

export { io, app, server };

import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import prisma from "../../prisma/prismaClient";
import jwt from "jsonwebtoken"; // For token verification

// Extend the Socket interface to include the user property
declare module "socket.io" {
  interface Socket {
    user?: any;
  }
}

const clients: { [key: number]: string } = {};

export const setupSocketIO = (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error("Authentication error"));
    }

    try {
      const decoded = jwt.verify(token, process.env.jwt_secret as string);
      socket.user = decoded;
      next();
    } catch (err) {
      return next(new Error("Authentication error"));
    }
  });

  // Handle new connections
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Handle joining rooms
    socket.on("joinRoom", (room) => {
      console.log(`User ${socket.id} joined room: ${room}`);
      socket.join(room);
    });

    socket.on("register", (userId: number) => {
      clients[userId] = socket.id;
      console.log(clients);
    });
    // Handle sending messages
    socket.on(
      "sendMessage",
      async ({ fromUserId, toUserId, content, imageUrl }) => {
        io.to(clients[toUserId]).emit("receiveMessage", {
          fromUserId,
          content,
          imageUrl,
        });

        try {
          // Save message in the database
          console.log(
            "fromUserId, toUserId, content",
            fromUserId,
            toUserId,
            content
          );

          const newMessage = await prisma.message.create({
            data: {
              fromUserId,
              toUserId,
              content,
              imageUrl,
            },
          });
          console.log("newMessage:", newMessage);
        } catch (error) {
          console.log("ERROR:", error);
        }
      }
    );

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};

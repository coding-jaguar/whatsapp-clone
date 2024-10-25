import prisma from "../../prisma/prismaClient";
import { Server } from "socket.io";
import { Request, Response, NextFunction } from "express";
import { connect } from "http2";

export const sendMessage =
  (io: Server) => async (req: Request, res: Response, next: NextFunction) => {
    const { fromUserId, toUserId, content } = req.body;

    try {
      const newMessage = await prisma.message.create({
        data: {
          fromUserId,
          toUserId,
          content,
        },
      });

      io.to(toUserId).emit("newMessage", newMessage);

      res.json(newMessage);
    } catch (error) {
      next(error);
    }
  };

export const getMessages = async (req: Request, res: Response) => {
  const { fromUserId: fromUserIdStr, toUserId: toUserIdStr } = req.query;

  // Convert to numbers
  const fromUserIdNum = parseInt(fromUserIdStr as string, 10);
  const toUserIdNum = parseInt(toUserIdStr as string, 10);

  // Check if the conversion was successful
  if (isNaN(fromUserIdNum) || isNaN(toUserIdNum)) {
    res.status(400).json({ error: "Invalid user ID(s)" });
    return;
  }

  try {
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {
            fromUserId: toUserIdNum,
            toUserId: fromUserIdNum,
          },
          {
            fromUserId: fromUserIdNum,
            toUserId: toUserIdNum,
          },
        ],
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    res.status(201).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

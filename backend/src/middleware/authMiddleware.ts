import { Request, Response, NextFunction } from "express";

import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "@prisma/client"; // Assuming you use Prisma's User model
import prisma from "../../prisma/prismaClient";

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Retrieve the token from the Authorization header (Bearer <token>)
  const token = req.headers["authorization"]?.split(" ")[1];

  // If no token is provided, return 401 Unauthorized
  if (!token) {
    res.status(401).json({ error: "Access denied. No token provided." });
    return;
  }

  try {
    // Verify the token using the secret from environment variables
    const secret = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, secret) as JwtPayload;

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
    });

    if (!user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    req.user = user;

    // Call the next middleware
    next();
  } catch (error) {
    // If the token is invalid, return 403 Forbidden
    res.status(403).json({ error: "Invalid token." });
    return;
  }
};

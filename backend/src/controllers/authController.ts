import prisma from "../../prisma/prismaClient"; // Import the singleton Prisma client
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

// Register new user
export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    const token = jwt.sign(
      { userId: user.id },
      process.env.jwt_secret as string
    );
    res.status(200).json({ token, name: user.name });
  } catch (err) {
    res.status(500).json({ error: "User registration failed" });
  }
};

// User login
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user.id }, process.env.jwt_secret as string);
  res.status(200).json({
    token,
    name: user.name,
  });
};

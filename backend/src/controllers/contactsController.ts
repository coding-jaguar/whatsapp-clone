import { User } from "@prisma/client";
import prisma from "../../prisma/prismaClient"; // Import the singleton Prisma client
import { Request, Response } from "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: User;
  }
}

// Add a new contact
export const addContact = async (req: Request, res: Response) => {
  const { contactId } = req.body;

  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const userId = req.user.id;

  try {
    await prisma.contact.create({
      data: { userId, contactId },
    });
    res.json({ message: "Contact added successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to add contact" });
  }
};

// Get user contacts
export const getContacts = async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const userId = req.user.id;

  try {
    const contacts = await prisma.contact.findMany({
      where: { userId },
      select: {
        contact: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
};

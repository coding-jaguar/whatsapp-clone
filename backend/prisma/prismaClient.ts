import { PrismaClient } from "@prisma/client";

// Declare a variable to hold the Prisma client instance
let prisma: PrismaClient;

declare global {
  // Declare a global variable for Prisma in the global namespace
  // to avoid re-declaration during hot-reloading in development
  var __prisma: PrismaClient | undefined;
}

// Initialize the Prisma client only once
if (!global.__prisma) {
  global.__prisma = new PrismaClient();
}

prisma = global.__prisma;

export default prisma;

import prisma from "../prisma/prismaClient"; // Use the singleton Prisma client
import bcrypt from "bcryptjs";

async function main() {
  // Clear existing data
  await prisma.message.deleteMany();
  await prisma.friendRequest.deleteMany();
  await prisma.contact.deleteMany();
  await prisma.user.deleteMany();

  // Create Users
  const alice = await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@example.com",
      password: await bcrypt.hash("alicepassword", 10),
    },
  });

  const bob = await prisma.user.create({
    data: {
      name: "Bob",
      email: "bob@example.com",
      password: await bcrypt.hash("bobpassword", 10),
    },
  });

  const charlie = await prisma.user.create({
    data: {
      name: "Charlie",
      email: "charlie@example.com",
      password: await bcrypt.hash("charliepassword", 10),
    },
  });

  const dave = await prisma.user.create({
    data: {
      name: "Dave",
      email: "dave@example.com",
      password: await bcrypt.hash("davepassword", 10),
    },
  });

  // Add Contacts
  await prisma.contact.createMany({
    data: [
      { userId: alice.id, contactId: bob.id },
      { userId: alice.id, contactId: charlie.id },
      { userId: bob.id, contactId: alice.id },
      { userId: charlie.id, contactId: bob.id },
      { userId: charlie.id, contactId: dave.id },
    ],
  });

  // Create Friend Requests
  await prisma.friendRequest.create({
    data: { senderId: alice.id, receiverId: dave.id, status: "pending" },
  });
  await prisma.friendRequest.create({
    data: { senderId: bob.id, receiverId: charlie.id, status: "accepted" },
  });

  // Create Messages between Users
  await prisma.message.createMany({
    data: [
      { fromUserId: alice.id, toUserId: bob.id, content: "Hi Bob!" },
      { fromUserId: bob.id, toUserId: alice.id, content: "Hey Alice!" },
      { fromUserId: alice.id, toUserId: charlie.id, content: "Hello Charlie!" },
      { fromUserId: charlie.id, toUserId: alice.id, content: "Hi Alice!" },
      {
        fromUserId: bob.id,
        toUserId: dave.id,
        content: "Hey Dave, how are you?",
      },
      {
        fromUserId: dave.id,
        toUserId: bob.id,
        content: "I’m doing well, thanks Bob!",
      },
    ],
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

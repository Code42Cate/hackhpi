import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const database = new PrismaClient();
async function seed() {
  console.log(`Successfully seeded database 🌱`);
}

seed();

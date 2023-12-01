import { PrismaClient } from "@prisma/client"

// const prisma = new PrismaClient()
// Crea un'istanza di Prisma

const prisma = new PrismaClient({
    datasources: {
      db: {
        url: `${process.env.DATABASE_URL}?connection_limit=20`,
      },
    },
  });

export { prisma };

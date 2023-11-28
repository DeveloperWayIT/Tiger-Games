import express from "express"
// import PrismaClient from "@prisma/client"
import { PrismaClient } from '@prisma/client';

const app = express();
const port = 3000;


// Crea un'istanza di Prisma
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `${process.env.DATABASE_URL}?connection_limit=20`,
    },
  },
});

// Endpoint per ottenere tutti i roles
app.get('/roles', async (req, res) => {
  try {
    // Utilizza Prisma per ottenere tutti gli utenti dalla tabella "User"
    const roles = await prisma.role.findMany();
    res.json(roles);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/users', async (req, res) => {
  try {
    // Utilizza Prisma per ottenere tutti gli utenti dalla tabella "User"
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Chiudi la connection pool e Prisma quando l'applicazione termina
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
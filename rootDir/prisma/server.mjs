import express from "express";
import { prisma } from './prisma.mjs';

// import {roleRoutes} from './routes/RoleRoutes.mjs';
import {userRoutes} from './routes/UserRoutes.mjs';

const app = express();
const port = 3000;

// Aggiunge il middleware per il parsing del corpo delle richieste JSON
app.use(express.json());

// Aggiunge le route specifiche
// app.use('/api', roleRoutes);
app.use('/api', userRoutes);

/*
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
*/

// Chiudi la connection pool e Prisma quando l'applicazione termina
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
import express from 'express';
import { prisma } from './utils/prisma';

import { roleRoutes } from './routes/RoleRoutes';
import { userRoutes } from './routes/UserRoutes';
import { addressRoutes } from './routes/AddressRoutes';
import { fileRoutes } from './routes/FileRoutes';
import { productRoutes } from './routes/ProductRoutes';
import { productSizeRoutes } from './routes/ProductSizeRoutes';
import { cartRoutes } from './routes/CartRoutes';
import { sessionRoutes } from './routes/SessionRoutes';

const app = express();
const port = process.env.PORT || 1337;

// Aggiunge il middleware per il parsing del corpo delle richieste JSON
app.use(express.json());

// Aggiunge le route specifiche
app.use('/api', roleRoutes);
app.use('/api', userRoutes);
app.use('/api', addressRoutes);
app.use('/api', fileRoutes);
app.use('/api', productRoutes);
app.use('/api', productSizeRoutes);
app.use('/api', cartRoutes);
app.use('/api', sessionRoutes);

// Chiudi la connection pool e Prisma quando l'applicazione termina
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

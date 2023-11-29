// import { Request, Response } from 'express';
import { prisma } from '../prisma.mjs';

export class UserController {
    static async getAllUsers(req, res) {
        // Implementa la logica per ottenere tutti gli utenti dal database
        const users = await prisma.user.findMany();
        res.json(users);
    }

    static async getUserById(req, res) {
        const userId = req.params.id;
        // Implementa la logica per ottenere un utente specifico dal database
        res.send(`Dettagli dell'utente con ID ${userId}`);
    }
}
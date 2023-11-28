// import { Request, Response } from 'express';
import { prisma } from '../prisma.mjs';

export class RoleController {
    static async getAllRoles(req, res) {
        // Implementa la logica per ottenere tutti gli utenti dal database
        const roles = await prisma.role.findMany();
        res.json(roles);
    }

    static async getRoleById(req, res) {
        const roleId = req.params.id;
        // Implementa la logica per ottenere un utente specifico dal database
        res.send(`Dettagli del role con ID ${roleId}`);
    }
}
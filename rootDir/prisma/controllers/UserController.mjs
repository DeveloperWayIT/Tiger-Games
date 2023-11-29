// import { Request, Response } from 'express';
import { prisma } from '../prisma.mjs';

export class UserController {
    static async getAllUsers(req, res) {
        try {
            const users = await prisma.user.findMany();
            res.json(users);
        } catch (error) {
            console.error('Error retrieving User:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async getUserById(req, res) {
        try {
            const userId = parseInt(req.params.id);
            const user = await prisma.user.findUnique({
                where: {
                  user_id: userId,
                },
              });
            res.json(user);
        } catch (error) {
            console.error('Error retrieving User:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

}
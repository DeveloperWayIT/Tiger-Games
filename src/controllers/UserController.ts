import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';

export class UserController {
  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany();
      res.json(users);
    } catch (error) {
      console.error('Error retrieving User:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getUserById(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.id);
      const user = await prisma.user.findUnique({
        where: {
          UserId: userId,
        },
      });
      res.json(user);
    } catch (error) {
      console.error('Error retrieving User:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';
import { fillParametersData } from "../common/Common";
import { logger } from "../common/Common";
import { parseBooleanDef } from "zod-to-json-schema";
import { boolean } from "zod";

interface UserCreateInput {
  // All properties of the model:
  UserId?: number;
  Email: string;
  Surname: string;
  Name: string;
  Password: string;
  RoleId: number;
  ActiveFlg: boolean;
}

export class UserController {
  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany();
      res.json(users);
    } catch (error) {
      logger.error('Error retrieving User:', error);
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
      logger.error('Error retrieving User:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getUserByFilter(req: Request, res: Response) {
    try {
      const queryConditions: Record<string, any> = {};

      fillParametersData(req.body, queryConditions);
      const users = await prisma.role.findMany({
        where: queryConditions,
      });

      res.json(users);
    } catch (error) {
      logger.error("Error retrieving User by filter:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async createUser(req: Request, res: Response) {
    try {
      const data: UserCreateInput = { Email: "", Surname: "", Name: "", Password: "", RoleId: -1, ActiveFlg: false };
      fillParametersData(req.body, data);

      const result = await prisma.user.create({
        data: data,
      });

      res.json(result);
    } catch (error) {
      logger.error("Error creating User:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const data: Record<string, any> = {};

      fillParametersData(req.body, data);
      const result = await prisma.user.deleteMany({
        where: data,
      });

      res.json(result);
    } catch (error) {
      logger.error("Error deleting User:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const { conditions, updateData } = req.body;

      const result = await prisma.user.updateMany({
        where: conditions,
        data: updateData,
      });

      res.json(result);
    } catch (error) {
      logger.error("Error updating User:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

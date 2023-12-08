import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';
import { ITALIAN_LANGUAGE, MESSAGE_LANGUAGE, fillParametersData, decodePrismaError, logger } from "../common/Common";
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

let specificMsg: string;

export class UserController {
  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany();
      res.json(users);
    } catch (error) {
      switch (MESSAGE_LANGUAGE) {
        case ITALIAN_LANGUAGE:
          specificMsg = "Errore nell'estrazione di tutti gli User";
          break;
        default:
          specificMsg = "Error retrieving all User";
          break;
      }
      res.status(500).json({ error: decodePrismaError(error, specificMsg) });
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
      switch (MESSAGE_LANGUAGE) {
        case ITALIAN_LANGUAGE:
          specificMsg = "Errore nella ricerca di uno User per id";
          break;
        default:
          specificMsg = "Error retrieving User by id";
          break;
      }
      res.status(500).json({ error: decodePrismaError(error, specificMsg) });
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
      switch (MESSAGE_LANGUAGE) {
        case ITALIAN_LANGUAGE:
          specificMsg = "Errore nell'estrazione degli User tramite filtro";
          break;
        default:
          specificMsg = "Error retrieving User by filter";
          break;
      }
      res.status(500).json({ error: decodePrismaError(error, specificMsg) });
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
      switch (MESSAGE_LANGUAGE) {
        case ITALIAN_LANGUAGE:
          specificMsg = "Errore nella creazione di User";
          break;
        default:
          specificMsg = "Error creating User";
          break;
      }
      res.status(500).json({ error: decodePrismaError(error, specificMsg) });
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
      switch (MESSAGE_LANGUAGE) {
        case ITALIAN_LANGUAGE:
          specificMsg = "Errore nella cancellazione di User";
          break;
        default:
          specificMsg = "Error deleting User";
          break;
      }
      res.status(500).json({ error: decodePrismaError(error, specificMsg) });
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
      switch (MESSAGE_LANGUAGE) {
        case ITALIAN_LANGUAGE:
          specificMsg = "Errore nell'aggiornamento di User";
          break;
        default:
          specificMsg = "Error updating User";
          break;
      }
      res.status(500).json({ error: decodePrismaError(error, specificMsg) });
    }
  }
}

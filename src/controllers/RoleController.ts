import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { fillParametersData } from "../common/Common";
import { parseBooleanDef } from "zod-to-json-schema";
import { boolean } from "zod";

interface RoleCreateInput {
  // All properties of the model:
  RoleId?: number;
  Role: string;
  ActiveFlg: boolean;
}

export class RoleController {

  static async getAllRoles(req: Request, res: Response) {
    try {
      const roles = await prisma.role.findMany();
      res.json(roles);
    } catch (error) {
      console.error("Error retrieving all Role:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async getRoleById(req: Request, res: Response) {
    try {
      const roleId = parseInt(req.params.id);
      const role = await prisma.role.findUnique({
        where: {
          RoleId: roleId,
        },
      });
      res.json(role);
    } catch (error) {
      console.error("Error retrieving Role by id:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  /**
   * 
   * @param req.body {"Role": "Client"}
   * @param res 
   */
  static async getRoleByFilter(req: Request, res: Response) {
    try {
      const queryConditions: Record<string, any> = {};

      fillParametersData(req.body, queryConditions);
      const roles = await prisma.role.findMany({
        where: queryConditions,
      });

      res.json(roles);
    } catch (error) {
      console.error("Error retrieving Role by filter:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  /**
   * 
   * @param req.body { { "Role": "Provider", "ActiveFlg": true }, <other fields...> }
   * @param res 
   */
  static async createRole(req: Request, res: Response) {
    try {
      const data: RoleCreateInput = { Role: "", ActiveFlg: false };
      fillParametersData(req.body, data);

      const result = await prisma.role.create({
        data: data,
      });

      res.json(result);
    } catch (error) {
      console.error("Error creating Role:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  /**
   * 
   * @param req.body { "RoleId": 3, <other conditions...> }
   * @param res 
   */
  static async deleteRole(req: Request, res: Response) {
    try {
      const data: Record<string, any> = {};

      fillParametersData(req.body, data);
      const result = await prisma.role.deleteMany({
        where: data,
      });

      res.json(result);
    } catch (error) {
      console.error("Error deleting Role:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  /**
   * 
   * @param req.body 
   * { 
        "conditions" : {
          "RoleId": 5
        },
        "updateData": {
          "ActiveFlg": false
        }
      }
   * @param res { "count": 1 }
   */
  static async updateRole(req: Request, res: Response) {
    try {
      const { conditions, updateData } = req.body;

      const result = await prisma.role.updateMany({
        where: conditions,
        data: updateData,
      });

      res.json(result);
    } catch (error) {
      console.error("Error updating Role:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

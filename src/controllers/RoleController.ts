import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { parseBooleanDef } from "zod-to-json-schema";
import { boolean } from "zod";

interface RoleCreateInput {
  // All properties of the model:
  role_id?: number;
  role: string;
  active_flg: boolean;
}

export class RoleController {
  static async getAllRoles(req: Request, res: Response) {
    try {
      const roles = await prisma.role.findMany();
      res.json(roles);
    } catch (error) {
      console.error("Error retrieving Role:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async getRoleById(req: Request, res: Response) {
    try {
      const roleId = parseInt(req.params.id);
      const role = await prisma.role.findUnique({
        where: {
          role_id: roleId,
        },
      });
      res.json(role);
    } catch (error) {
      console.error("Error retrieving Role:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  /**
   * 
   * @param req.body {"role": "Client"}
   * @param res 
   */
  static async getRoleByFilter(req: Request, res: Response) {
    try {
      const queryConditions: Record<string, any> = {};

      RoleController.fillParametersData(req.body, queryConditions);
      const roles = await prisma.role.findMany({
        where: queryConditions,
      });

      res.json(roles);
    } catch (error) {
      console.error("Error creating Role:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  private static fillParametersData(params: any, data: Record<string, any>) {
    if (!params) {
      throw new Error("No parameters in input");
    }

    // Cycle throuh all parameters and assign only those defined:
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        data[key] = params[key];
      }
    }
  }

  /**
   * 
   * @param req.body { { "role": "Provider", "active_flg": true }, <other fields...> }
   * @param res 
   */
  static async createRole(req: Request, res: Response) {
    try {
      //Example parameters to be sent in req.params:
      //  { Role: 'Client', ActiveFlg: true, OtherField: 'value' };

      const data: RoleCreateInput = { role: "", active_flg: false };
      RoleController.fillParametersData(req.body, data);

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
   * @param req.body { "role_id": 3, <other conditions...> }
   * @param res 
   */
  static async deleteRole(req: Request, res: Response) {
    try {
      //Example parameters to be sent in req.params:
      //  { Role: 'Client', ActiveFlg: true, OtherField: 'value' };

      const data: Record<string, any> = {};

      RoleController.fillParametersData(req.body, data);
      const result = await prisma.role.deleteMany({
        where: data,
      });

      res.json(result);
    } catch (error) {
      console.error("Error creating Role:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  /**
   * 
   * @param req.body 
   * { 
        "conditions" : {
          "role_id": 5
        },
        "updateData": {
          "active_flg": false
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
      console.error("Error creating Role:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

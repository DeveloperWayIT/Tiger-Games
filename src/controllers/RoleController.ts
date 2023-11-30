import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

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
}

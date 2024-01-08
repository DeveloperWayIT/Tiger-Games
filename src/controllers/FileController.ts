import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { ITALIAN_LANGUAGE, MESSAGE_LANGUAGE, fillParametersData, decodePrismaError, logger, jsonparse } from "../common/Common";
import { parseBooleanDef } from "zod-to-json-schema";
import { bigint, boolean, string } from "zod";
import { Prisma } from "@prisma/client";

interface FileCreateInput {
  // All properties of the model:
  FileId?: bigint;
  FileName: string;
  FileType: string;
  Content: Buffer;
  ActiveFlg: boolean;
}

let specificMsg: string;

export class FileController {

  // static async getAllFiles(req: Request, res: Response) {
  //   try {
  //     const Files = await prisma.file.findMany();
  //     res.json(Files);
  //   } catch (error) {
  //     res.status(500).json({ error: decodePrismaError(error, "SPEC0001", ["File"]) });
  //   }
  // }

  static async getFileById(req: Request, res: Response) {
    try {
      const FileId = BigInt(req.params.id);
      const File = await prisma.file.findUnique({
        where: {
          FileId: FileId,
        },
      });
      res.json(jsonparse(File));
    } catch (error) {
      res.status(500).json({ error: decodePrismaError(error, "SPEC0002", ["File"]) });
    }
  }

  /**
   * 
   * @param req.body {"File": "Client"}
   * @param res 
   */
  static async getFileByFilter(req: Request, res: Response) {
    try {
      const queryConditions: Record<string, any> = {};

      fillParametersData(req.body, queryConditions);
      const Files = await prisma.file.findMany({
        where: queryConditions,
      });

      res.json(jsonparse(Files));
    } catch (error) {
      res.status(500).json({ error: decodePrismaError(error, "SPEC0003", ["File"]) });
    }
  }

  /**
   * 
   * @param req.body { { "File": "Provider", "ActiveFlg": true }, <other fields...> }
   * @param res 
   */
  static async createFile(req: Request, res: Response) {
    const data: FileCreateInput = { 
      FileName: "",
      FileType: "",
      Content: Buffer.from("", 'base64'),
      ActiveFlg: false 
    };

    try {
      fillParametersData(req.body, data);

      const result = await prisma.file.create({
        data: data,
      });

      const resultForJson = {
        FileId: result.FileId.toString()
      };

      res.json(resultForJson);
    } catch (error) {
      res.status(500).json({ error: decodePrismaError(error, "SPEC0004", ["File", data.FileName]) });
    }
  }

  /**
   * 
   * @param req.body { "FileId": 3, <other conditions...> }
   * @param res 
   */
  static async deleteFile(req: Request, res: Response) {
    try {
      const data: Record<string, any> = {};

      fillParametersData(req.body, data);
      const result = await prisma.file.deleteMany({
        where: data,
      });

      res.json(result);
    } catch (error) {
      res.status(500).json({ error: decodePrismaError(error, "SPEC0005", ["File"]) });
    }
  }

  /**
   * 
   * @param req.body 
   * { 
        "conditions" : {
          "FileId": 5
        },
        "updateData": {
          "ActiveFlg": false
        }
      }
   * @param res { "count": 1 }
   */
  static async updateFile(req: Request, res: Response) {
    try {
      const { conditions, updateData } = req.body;

      const result = await prisma.file.updateMany({
        where: conditions,
        data: updateData,
      });

      res.json(result);
    } catch (error) {
      res.status(500).json({ error: decodePrismaError(error, "SPEC0006", ["File"]) });
    }
  }
}

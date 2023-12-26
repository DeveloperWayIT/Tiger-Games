import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { ITALIAN_LANGUAGE, MESSAGE_LANGUAGE, fillParametersData, decodePrismaError, logger } from "../common/Common";
import { parseBooleanDef } from "zod-to-json-schema";
import { boolean } from "zod";
import { Prisma } from "@prisma/client";

interface AddressCreateInput {
  // All properties of the model:
  AddressId?: number;
  AddressTypeId: number; 
  UserId: number;
  Street: string;
  CityId: number;
  CAP: string;
  ActiveFlg: boolean;
}

let specificMsg: string;

export class AddressController {

  static async getAllAddresss(req: Request, res: Response) {
    try {
      const Addresss = await prisma.address.findMany();
      res.json(Addresss);
    } catch (error) {
      res.status(500).json({ error: decodePrismaError(error, "SPEC0001", ["Address"]) });
    }
  }

  static async getAddressById(req: Request, res: Response) {
    try {
      const AddressId = parseInt(req.params.id);
      const Address = await prisma.address.findUnique({
        where: {
          AddressId: AddressId,
        },
      });
      res.json(Address);
    } catch (error) {
      res.status(500).json({ error: decodePrismaError(error, "SPEC0002", ["Address"]) });
    }
  }

  /**
   * 
   * @param req.body {"Address": "Client"}
   * @param res 
   */
  static async getAddressByFilter(req: Request, res: Response) {
    try {
      const queryConditions: Record<string, any> = {};

      fillParametersData(req.body, queryConditions);
      const Addresss = await prisma.address.findMany({
        where: queryConditions,
      });

      res.json(Addresss);
    } catch (error) {
      res.status(500).json({ error: decodePrismaError(error, "SPEC0003", ["Address"]) });
    }
  }

  /**
   * 
   * @param req.body { { "Address": "Provider", "ActiveFlg": true }, <other fields...> }
   * @param res 
   */
  static async createAddress(req: Request, res: Response) {
    const data: AddressCreateInput = { 
      AddressTypeId: 0, 
      UserId: 0,
      Street: "",
      CityId: 0,
      CAP: "",
      ActiveFlg: false 
    };

    try {
      fillParametersData(req.body, data);

      const result = await prisma.address.create({
        data: data,
      });

      res.json(result);
    } catch (error) {
      res.status(500).json({ error: decodePrismaError(error, "SPEC0004", ["Address", data.Street + ", UserId " + data.UserId]) });
    }
  }

  /**
   * 
   * @param req.body { "AddressId": 3, <other conditions...> }
   * @param res 
   */
  static async deleteAddress(req: Request, res: Response) {
    try {
      const data: Record<string, any> = {};

      fillParametersData(req.body, data);
      const result = await prisma.address.deleteMany({
        where: data,
      });

      res.json(result);
    } catch (error) {
      res.status(500).json({ error: decodePrismaError(error, "SPEC0005", ["Address"]) });
    }
  }

  /**
   * 
   * @param req.body 
   * { 
        "conditions" : {
          "AddressId": 5
        },
        "updateData": {
          "ActiveFlg": false
        }
      }
   * @param res { "count": 1 }
   */
  static async updateAddress(req: Request, res: Response) {
    try {
      const { conditions, updateData } = req.body;

      const result = await prisma.address.updateMany({
        where: conditions,
        data: updateData,
      });

      res.json(result);
    } catch (error) {
      res.status(500).json({ error: decodePrismaError(error, "SPEC0006", ["Address"]) });
    }
  }
}

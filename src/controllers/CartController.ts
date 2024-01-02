import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { ITALIAN_LANGUAGE, MESSAGE_LANGUAGE, fillParametersData, decodePrismaError, logger, jsonparse } from "../common/Common";
import { parseBooleanDef } from "zod-to-json-schema";
import { boolean } from "zod";
import { Prisma } from "@prisma/client";

interface CartCreateInput {
  // All properties of the model:
  CartId?: bigint;
  SessionId: bigint;
  ProductSizeId: bigint;
  Quantity: number;
  ActiveFlg: boolean;
}

let specificMsg: string;

export class CartController {

  static async getAllCarts(req: Request, res: Response) {
    try {
      const Carts = await prisma.cart.findMany();
      res.json(jsonparse(Carts));
    } catch (error) {
      res.status(500).json({ error: decodePrismaError(error, "SPEC0001", ["Cart"]) });
    }
  }

  static async getCartById(req: Request, res: Response) {
    try {
      const CartId = BigInt(req.params.id);
      const Cart = await prisma.cart.findUnique({
        where: {
          CartId: CartId,
        },
      });
      res.json(jsonparse(Cart));
    } catch (error) {
      res.status(500).json({ error: decodePrismaError(error, "SPEC0002", ["Cart"]) });
    }
  }

  /**
   * 
   * @param req.body {"Cart": "Client"}
   * @param res 
   */
  static async getCartByFilter(req: Request, res: Response) {
    try {
      const queryConditions: Record<string, any> = {};

      fillParametersData(req.body, queryConditions);
      const Carts = await prisma.cart.findMany({
        where: queryConditions,
      });

      res.json(jsonparse(Carts));
    } catch (error) {
      res.status(500).json({ error: decodePrismaError(error, "SPEC0003", ["Cart"]) });
    }
  }

  /**
   * 
   * @param req.body { { "Cart": "Provider", "ActiveFlg": true }, <other fields...> }
   * @param res 
   */
  static async createCart(req: Request, res: Response) {
    const data: CartCreateInput = { 
      SessionId: BigInt(0),
      ProductSizeId: BigInt(0),
      Quantity: 0,
      ActiveFlg: false 
    };
    try {
      fillParametersData(req.body, data);

      const result = await prisma.cart.create({
        data: data,
      });

      const resultForJson = {
        CartId: result.CartId.toString()
      };

      res.json(resultForJson);
    } catch (error) {
      res.status(500).json({ error: decodePrismaError(error, "SPEC0004", ["Cart for SessionId: ", data.SessionId]) });
    }
  }

  /**
   * 
   * @param req.body { "CartId": 3, <other conditions...> }
   * @param res 
   */
  static async deleteCart(req: Request, res: Response) {
    try {
      const data: Record<string, any> = {};

      fillParametersData(req.body, data);
      const result = await prisma.cart.deleteMany({
        where: data,
      });

      res.json(result);
    } catch (error) {
      res.status(500).json({ error: decodePrismaError(error, "SPEC0005", ["Cart"]) });
    }
  }

  /**
   * 
   * @param req.body 
   * { 
        "conditions" : {
          "CartId": 5
        },
        "updateData": {
          "ActiveFlg": false
        }
      }
   * @param res { "count": 1 }
   */
  static async updateCart(req: Request, res: Response) {
    try {
      const { conditions, updateData } = req.body;

      const result = await prisma.cart.updateMany({
        where: conditions,
        data: updateData,
      });

      res.json(result);
    } catch (error) {
      res.status(500).json({ error: decodePrismaError(error, "SPEC0006", ["Cart"]) });
    }
  }
}

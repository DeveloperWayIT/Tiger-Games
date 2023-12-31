import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { ITALIAN_LANGUAGE, MESSAGE_LANGUAGE, fillParametersData, decodePrismaError, logger, jsonparse } from "../common/Common";
import { parseBooleanDef } from "zod-to-json-schema";
import { boolean } from "zod";
import { Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

interface ProductCreateInput {
  // All properties of the model:
  ProductId?: bigint;
  ProductCode: string;
  Product: string;
  Details: string;
  Price?: number;
  Discount?: number;
  CurrencyId: number;
  CategoryId:number;
  ImageId: bigint;
  ManualId: bigint
  ActiveFlg: boolean;
}

let specificMsg: string;

export class ProductController {

  static async getAllProducts(req: Request, res: Response) {
    try {
      const Products = await prisma.product.findMany();
      res.json(jsonparse(Products));
    } catch (error) {
      res.status(500).json({ error: decodePrismaError(error, "SPEC0001", ["Product"]) });
    }
  }

  static async getProductById(req: Request, res: Response) {
    try {
      const ProductId = BigInt(req.params.id);
      const Product = await prisma.product.findUnique({
        include: {
          Currency: {
            select: {
              Currency: true,
              CurrencyCode: true,
            },
          },
        },
        where: {
          ProductId: ProductId,
        },
      });
      res.json(jsonparse(Product));
    } catch (error) {
      res.status(500).json({ error: decodePrismaError(error, "SPEC0002", ["Product"]) });
    }
  }

  /**
   * 
   * @param req.body {"Product": "Client"}
   * @param res 
   */
  static async getProductByFilter(req: Request, res: Response) {
    try {
      const queryConditions: Record<string, any> = {};

      fillParametersData(req.body, queryConditions);
      const Products = await prisma.product.findMany({
        include: {
          Currency: {
            select: {
              Currency: true,
              CurrencyCode: true,
            },
          },
        },
        where: queryConditions,
      });

      res.json(jsonparse(Products));
    } catch (error) {
      res.status(500).json({ error: decodePrismaError(error, "SPEC0003", ["Product"]) });
    }
  }

  /**
   * 
   * @param req.body { { "Product": "Provider", "ActiveFlg": true }, <other fields...> }
   * @param res 
   */
  static async createProduct(req: Request, res: Response) {
    const data: ProductCreateInput = {  
      ProductCode: "",
      Product: "",
      Details: "",
      Price: 0,
      Discount: 0,
      CurrencyId: 0,
      CategoryId: 0,
      ImageId: BigInt(0),
      ManualId: BigInt(0),
      ActiveFlg: false 
    };
    
    try {
      fillParametersData(req.body, data);

      const result = await prisma.product.create({
        data: data,
      });

      res.json(jsonparse(result));
    } catch (error) {
      res.status(500).json({ error: decodePrismaError(error, "SPEC0004", ["Product", data.Product]) });
    }
  }

  /**
   * 
   * @param req.body { "ProductId": 3, <other conditions...> }
   * @param res 
   */
  static async deleteProduct(req: Request, res: Response) {
    try {
      const data: Record<string, any> = {};

      fillParametersData(req.body, data);
      const result = await prisma.product.deleteMany({
        where: data,
      });

      res.json(result);
    } catch (error) {
      res.status(500).json({ error: decodePrismaError(error, "SPEC0005", ["Product"]) });
    }
  }

  /**
   * 
   * @param req.body 
   * { 
        "conditions" : {
          "ProductId": 5
        },
        "updateData": {
          "ActiveFlg": false
        }
      }
   * @param res { "count": 1 }
   */
  static async updateProduct(req: Request, res: Response) {
    try {
      const { conditions, updateData } = req.body;

      const result = await prisma.product.updateMany({
        where: conditions,
        data: updateData,
      });

      res.json(result);
    } catch (error) {
      res.status(500).json({ error: decodePrismaError(error, "SPEC0006", ["Product"]) });
    }
  }
}

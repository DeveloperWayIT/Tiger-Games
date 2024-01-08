import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { ITALIAN_LANGUAGE, MESSAGE_LANGUAGE, fillParametersData, decodePrismaError, logger, jsonparse } from "../common/Common";
import { parseBooleanDef } from "zod-to-json-schema";
import { boolean } from "zod";
import { Prisma } from "@prisma/client";

interface ProductSizeCreateInput {
  // All properties of the model:
  ProductSizeId?: bigint;
  ProductId: bigint;
  ProductSize: string;
  Price?: number;
  Discount?: number;
  Length?: number;
  Width?: number;
  Depth?: number;
  Weight?: number;
  Volume?: number;
  FragileFlg: boolean;
  BatteryFlg: boolean;
  CategorySizeId: number;
  ActiveFlg: boolean;
}

let specificMsg: string;

export class ProductSizeController {

  static async getAllProductSizes(req: Request, res: Response) {
    try {
      const ProductSizes = await prisma.productSize.findMany();
      res.json(jsonparse(ProductSizes));
    } catch (error) {
      res.status(500).json({ error: decodePrismaError(error, "SPEC0001", ["ProductSize"]) });
    }
  }

  static async getProductSizeById(req: Request, res: Response) {
    try {
      const ProductSizeId = BigInt(req.params.id);
      const ProductSize = await prisma.productSize.findUnique({
        include: {
          Product: {
            include: {
              Currency: {
                select: {
                  Currency: true,
                  CurrencyCode: true,
                },
              },
            },
          },
        },
        where: {
          ProductSizeId: ProductSizeId,
        },
      });
      res.json(jsonparse(ProductSize));
    } catch (error) {
      res.status(500).json({ error: decodePrismaError(error, "SPEC0002", ["ProductSize"]) });
    }
  }

  /**
   * 
   * @param req.body {"ProductSize": "Client"}
   * @param res 
   */
  static async getProductSizeByFilter(req: Request, res: Response) {
    try {
      const queryConditions: Record<string, any> = {};

      fillParametersData(req.body, queryConditions);
      const ProductSizes = await prisma.productSize.findMany({
        include: {
          Product: {
            include: {
              Currency: {
                select: {
                  Currency: true,
                  CurrencyCode: true,
                },
              },
            },
          },
        },
        where: queryConditions,
      });

      res.json(jsonparse(ProductSizes));
    } catch (error) {
      res.status(500).json({ error: decodePrismaError(error, "SPEC0003", ["ProductSize"]) });
    }
  }

  /**
   * 
   * @param req.body { { "ProductSize": "Provider", "ActiveFlg": true }, <other fields...> }
   * @param res 
   */
  static async createProductSize(req: Request, res: Response) {
    const data: ProductSizeCreateInput = { 
      ProductId: BigInt(0),
      ProductSize: "",
      Price: 0,
      Discount: 0,
      Length: 0,
      Width: 0,
      Depth: 0,
      Weight: 0,
      Volume: 0,
      FragileFlg: false,
      BatteryFlg: false,
      CategorySizeId: 0,
      ActiveFlg: false 
    };
    try {
      fillParametersData(req.body, data);

      const result = await prisma.productSize.create({
        data: data,
      });

      const resultForJson = {
        ProductSizeId: result.ProductSizeId.toString()
      };

      res.json(resultForJson);
    } catch (error) {
      res.status(500).json({ error: decodePrismaError(error, "SPEC0004", ["ProductSize", data.ProductSize]) });
    }
  }

  /**
   * 
   * @param req.body { "ProductSizeId": 3, <other conditions...> }
   * @param res 
   */
  static async deleteProductSize(req: Request, res: Response) {
    try {
      const data: Record<string, any> = {};

      fillParametersData(req.body, data);
      const result = await prisma.productSize.deleteMany({
        where: data,
      });

      res.json(result);
    } catch (error) {
      res.status(500).json({ error: decodePrismaError(error, "SPEC0005", ["ProductSize"]) });
    }
  }

  /**
   * 
   * @param req.body 
   * { 
        "conditions" : {
          "ProductSizeId": 5
        },
        "updateData": {
          "ActiveFlg": false
        }
      }
   * @param res { "count": 1 }
   */
  static async updateProductSize(req: Request, res: Response) {
    try {
      const { conditions, updateData } = req.body;

      const result = await prisma.productSize.updateMany({
        where: conditions,
        data: updateData,
      });

      res.json(result);
    } catch (error) {
      res.status(500).json({ error: decodePrismaError(error, "SPEC0006", ["ProductSize"]) });
    }
  }
}

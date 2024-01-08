import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { ITALIAN_LANGUAGE, MESSAGE_LANGUAGE, fillParametersData, decodePrismaError, logger, jsonparse, addMinutes } from "../common/Common";
import { parseBooleanDef } from "zod-to-json-schema";
import { boolean, string } from "zod";
import { Prisma } from "@prisma/client";

interface SessionCreateInput {
  // All properties of the model:
  SessionId?: bigint;
  UserId: number;
  StartDatetime: Date;
  EndDatetime?: Date;
  Token: string;
  TokenEndDatetime: Date;
  ActiveFlg: boolean;
}

let specificMsg: string;

export class SessionController {

  static async getAllSessions(req: Request, res: Response) {
    try {
      const Sessions = await prisma.session.findMany();
      res.json(jsonparse(Sessions));
    } catch (error) {
      res.status(500).json({ error: decodePrismaError(error, "SPEC0001", ["Session"]) });
    }
  }

  static async getSessionById(req: Request, res: Response) {
    try {
      const SessionId = BigInt(req.params.id);
      const Session = await prisma.session.findUnique({
        include: {
          Cart: {
            orderBy: [
              {
                CartId: 'asc',
              },
            ],
            include: {
              ProductSize: {
                include: {
                  Product: {
                    include: {
                      Currency: {
                        select: {
                          Currency: true,
                          CurrencyCode: true,
                        },
                      },
                    }
                  }
                }
              }
            },
          },
        },
        where: {
          SessionId: SessionId,
        },
      });
      res.json(jsonparse(Session));
    } catch (error) {
      res.status(500).json({ error: decodePrismaError(error, "SPEC0002", ["Session"]) });
    }
  }

  /**
   * 
   * @param req.body {"Session": "Client"}
   * @param res 
   */
  static async getSessionByFilter(req: Request, res: Response) {
    try {
      const queryConditions: Record<string, any> = {};

      fillParametersData(req.body, queryConditions);
      const Sessions = await prisma.session.findMany({
        include: {
          Cart: {
            orderBy: [
              {
                CartId: 'asc',
              },
            ],
            include: {
              ProductSize: {
                include: {
                  Product: {
                    include: {
                      Currency: {
                        select: {
                          Currency: true,
                          CurrencyCode: true,
                        },
                      },
                    }
                  }
                }
              }
            },
          },
        },
        where: queryConditions,
      });

      res.json(jsonparse(Sessions));
    } catch (error) {
      res.status(500).json({ error: decodePrismaError(error, "SPEC0003", ["Session"]) });
    }
  }

  /**
   * 
   * @param req.body { { "Session": "Provider", "ActiveFlg": true }, <other fields...> }
   * @param res 
   */
  static async createSession(req: Request, res: Response) {
    const data: SessionCreateInput = { 
      UserId: 0,
      StartDatetime: new Date(),
      EndDatetime: new Date(),
      Token:  "",
      TokenEndDatetime: new Date(),
      ActiveFlg: true 
    };
    try {
      fillParametersData(req.body, data);
      data.EndDatetime = new Date("2999-12-31");
      data.TokenEndDatetime = addMinutes(data.StartDatetime, 3);
      data.Token = (Math.random()*1000000000000000).toString();

      const result = await prisma.session.create({
        data: data,
      });

      const resultForJson = {
        SessionId: result.SessionId.toString()
      };

      res.json(resultForJson);
    } catch (error) {
      res.status(500).json({ error: decodePrismaError(error, "SPEC0004", ["SessionId", data.SessionId]) });
    }
  }

  /**
   * 
   * @param req.body { "SessionId": 3, <other conditions...> }
   * @param res 
   */
  static async deleteSession(req: Request, res: Response) {
    try {
      const data: Record<string, any> = {};

      fillParametersData(req.body, data);
      const result = await prisma.session.deleteMany({
        where: data,
      });

      res.json(result);
    } catch (error) {
      res.status(500).json({ error: decodePrismaError(error, "SPEC0005", ["Session"]) });
    }
  }

  /**
   * 
   * @param req.body 
   * { 
        "conditions" : {
          "SessionId": 5
        },
        "updateData": {
          "ActiveFlg": false
        }
      }
   * @param res { "count": 1 }
   */
  static async updateSession(req: Request, res: Response) {
    try {
      const { conditions, updateData } = req.body;

      const result = await prisma.session.updateMany({
        where: conditions,
        data: updateData,
      });

      res.json(result);
    } catch (error) {
      res.status(500).json({ error: decodePrismaError(error, "SPEC0006", ["Session"]) });
    }
  }
}

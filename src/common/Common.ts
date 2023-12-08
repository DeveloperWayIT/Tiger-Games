
import winston from 'winston';
import { Prisma } from "@prisma/client";
const LOG_FILE_PATH = process.env.LOG_FILE_PATH;
const LOG_LEVEL = process.env.LOG_LEVEL;
export const MESSAGE_LANGUAGE = process.env.MESSAGE_LANGUAGE;
export const ITALIAN_LANGUAGE = "italian";

export const logger = winston.createLogger({
  level: LOG_LEVEL,
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: LOG_FILE_PATH })
  ],
});

export function fillParametersData(params: any, data: Record<string, any>) {
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

export function decodePrismaError(error: any, specificMsg: string): string {
  logger.error(specificMsg);
  logger.error(error.code);
  logger.error(error.message);
  logger.debug(error);

  let message: string = "";

  if (error instanceof Prisma.PrismaClientKnownRequestError) {

    if (error.code === 'P2002') {
      switch (MESSAGE_LANGUAGE) {
        case ITALIAN_LANGUAGE:
          message = "perché è stato violato un vincolo di unicità";
          break;
        default:
          message = "because a unique constraint was violated";
          break;
      }
    } else if (error.code === 'P2003') {
      switch (MESSAGE_LANGUAGE) {
        case ITALIAN_LANGUAGE:
          message = "perché è usato da altri elementi, che bisogna gestire prima";
          break;
        default:
          message = "because it is still used by other records. First manage them";
          break;
      }

    } else if (error.code === 'P2011') {
      switch (MESSAGE_LANGUAGE) {
        case ITALIAN_LANGUAGE:
          message = "perché non hai valorizzato un campo obbligatorio";
          break;
        default:
          message = "because you didn't fill in a mandatory field";
          break;
      }

    } else {
      switch (MESSAGE_LANGUAGE) {
        case ITALIAN_LANGUAGE:
          message = "a causa di un errore. Chiedi dettagli all'Amministratore del Sistema";
          break;
        default:
          message = "because of an error. Ask details to the Administrator";
          break;
      }
    }

  } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    switch (MESSAGE_LANGUAGE) {
      case ITALIAN_LANGUAGE:
        message = "a causa di un errore sconosciuto. Chiedi dettagli all'Amministratore del Sistema";
        break;
      default:
        message = "because of an unknown error. Ask details to the Administrator";
        break;
    }

  } else {
    switch (MESSAGE_LANGUAGE) {
      case ITALIAN_LANGUAGE:
        message = "a causa di un errore generico. Chiedi dettagli all'Amministratore del Sistema";
        break;
      default:
        message = "because of a generic error. Ask details to the Administrator";
        break;
    }
  }

  return specificMsg + ", " + message;
}

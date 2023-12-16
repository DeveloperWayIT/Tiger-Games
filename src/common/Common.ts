import * as fs from 'fs';
import winston from 'winston';
import { Prisma } from "@prisma/client";
import { number } from 'zod';
const LOG_FILE_PATH = process.env.LOG_FILE_PATH;
const LOG_LEVEL = process.env.LOG_LEVEL;
const DICTIONARY_FILE_PATH = process.env.DICTIONARY_FILE_PATH ? process.env.DICTIONARY_FILE_PATH + "/MsgDictionary.json" : "/MsgDictionary.json";

export const MESSAGE_LANGUAGE: string = process.env.MESSAGE_LANGUAGE ? process.env.MESSAGE_LANGUAGE : "english";
export const ITALIAN_LANGUAGE = "italian";
export const FRENCH_LANGUAGE = "french";

interface Msg {
  // Structure of JSON records from the dictionary file
  MsgCode: string;
  English: string;
  Italian: string;
  French: string;
}

const filePath = DICTIONARY_FILE_PATH;

function loadJsonFile(filePath: string): Record<string, Msg> {
  try {
    // Read the JSON file synchronously
    const data = fs.readFileSync(filePath, 'utf-8');

    // Parse the JSON data into an array of records
    const records: Msg[] = JSON.parse(data);

    // Create a dictionary using MsgCode as key
    const recordsDictionary: Record<string, Msg> = {};
    records.forEach(record => {
      recordsDictionary[record.MsgCode] = record;
    });

    return recordsDictionary;
  } catch (error) {
    console.error('Error reading JSON file:', error);
    return {};
  }
}

function translateMsg(msg: Msg, language: string, params: any[]): string {
  let text: string;
  switch (language) {
    case ITALIAN_LANGUAGE:
      text = msg["Italian"];
      break;
    case FRENCH_LANGUAGE:
      text = msg["French"];
      break;
    default:
      text = msg["English"];
      break;
  }
  if (!text) return "";

  let i: number = 0;
  params.forEach((element: any) => {
    text = text.replace("{"+i+"}", element);
    i++;
  });

  return text;
}

// load message dictionary from file:
const jsonDictionaryRecords = loadJsonFile(filePath);

////////////////////////////////////////////
// exported objects
////////////////////////////////////////////

// logger
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

export function decodePrismaError(error: any, specificMsgCode: string, params: any[]): string {
  const msgspec = jsonDictionaryRecords[specificMsgCode];
  const msgspecTranslated = translateMsg(msgspec, MESSAGE_LANGUAGE, params);

  logger.error(specificMsgCode);
  logger.error(msgspecTranslated);
  logger.error(error.code);
  logger.error(error.message);
  logger.debug(error);

  let message: string = "";
  let msg: Msg;

  // find the message into the dictionary
  if (error instanceof Prisma.PrismaClientKnownRequestError) {

    if (error.code === 'P2002' ||
        error.code === 'P2003' ||
        error.code === 'P2011') {
      
      msg = jsonDictionaryRecords[error.code];

    } else {
      msg = jsonDictionaryRecords["GEN01"];
    }

  } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    msg = jsonDictionaryRecords["GEN02"];
  } else {
    msg = jsonDictionaryRecords["GEN03"];
  }

  // now use the compliant translation requested
  message = translateMsg(msg, MESSAGE_LANGUAGE, []);
  
  return msgspecTranslated + ", " + message;
}

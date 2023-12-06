
import winston from 'winston';
const LOG_FILE_PATH = process.env.LOG_FILE_PATH;
const LOG_LEVEL = process.env.LOG_LEVEL;

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

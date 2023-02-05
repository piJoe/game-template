import winston from "winston";
import "winston-daily-rotate-file";

export const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.metadata({
      fillExcept: ["timestamp", "level", "message"],
    }),
    winston.format.json({
      deterministic: false,
    })
  ),
  transports: [
    new winston.transports.DailyRotateFile({
      dirname: "/logs",
      filename: "log-%DATE%.log",
      datePattern: "YYYY-MM-DD",
    }),
  ],
});

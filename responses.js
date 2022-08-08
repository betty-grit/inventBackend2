import winston from "winston";

const logger = winston.createLogger({
  level: "error",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "app.log" }),
  ],
});
export const responseHandler = (res, message, status, data) => {
  logger.error(message);
  return res.status(status).send({
    message,
    data,
  });
};

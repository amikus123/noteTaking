import mongoose from "mongoose";
import logger from "./logger";
export default function connect() {
  const dbUri = process.env.DB_URI as string;
  mongoose.set("strictQuery", false);
  return mongoose
    .connect(dbUri)
    .then(() => {
      logger.info("Connected to db");
    })
    .catch((e) => {
      logger.error("db error ", e);
    });
}

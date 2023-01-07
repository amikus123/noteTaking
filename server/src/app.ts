import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import routes from "./routes";
import connect from "./utils/connect";
import logger from "./utils/logger";

const app = express();

const port = process.env.PORT;
const host = process.env.HOST;

// middleware used to parse body
app.use(express.json());

app.listen(Number(port), async () => {
  logger.info(`App is running at http://${host}:${port}`);
  // db connection
  await connect();
  routes(app);
});

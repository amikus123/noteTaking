import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import routes from "./routes";
import connect from "./utils/connect";
import logger from "./utils/logger";
import cors from "cors";
const app = express();

const port = process.env.PORT;
const origin = process.env.ORIGIN;

// middleware used to parse body
app.use(express.json());
app.use(
  cors({
    origin: origin,
    credentials: true,
  })
);
app.listen(Number(port), async () => {
  logger.info(`App is running at port ${port}`);
  // db connection
  await connect();
  routes(app);
});

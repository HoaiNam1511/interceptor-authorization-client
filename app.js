import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import { routeV1 } from "./routers/v1/index.js";

const app = express();

dotenv.config();

app.use(bodyParser.json());
app.use("/v1", routeV1);

app.listen(8080, () => {
  console.log("Start");
});

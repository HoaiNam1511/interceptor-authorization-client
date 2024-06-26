import express from "express";

import { userRoute } from "./userRoute.js";

const Route = express.Router();

Route.use("/user", userRoute);

export const routeV1 = Route;

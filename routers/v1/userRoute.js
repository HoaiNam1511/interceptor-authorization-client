import express from "express";

import { useController } from "../../controller/userController.js";

const Route = express.Router();

Route.route("/login").post(useController.login);

export const userRoute = Route;

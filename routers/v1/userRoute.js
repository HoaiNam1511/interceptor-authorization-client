import express from "express";

import { useController } from "../../controller/userController.js";
import isAuthorization from "../../middleware/isAuthorization.js";

const Route = express.Router();

Route.route("/login").post(useController.login);
Route.route("/access").get(isAuthorization, useController.access);
Route.route("/refresh").put(useController.refreshToken);

export const userRoute = Route;

import { StatusCodes } from "http-status-codes";
import { generateToken } from "../providers/jwtProvider.js";

const user = {
  email: "admin@gmail.com",
  password: "123123123",
};

const login = async (req, res) => {
  try {
    const { body } = req.body;
    console.log(req.headers);

    if (body.identify === user.email && body.password === user.password) {
      const accessToken = await generateToken(
        body,
        process.env.SECRET_ACCESS_KEY,
        "1h"
      );

      const refreshToken = await generateToken(
        body,
        process.env.SECRET_REFRESH_KEY,
        "14 days"
      );

      res.status(StatusCodes.OK).json({
        userInfo: {
          identify: body.identify,
        },
        accessToken,
        refreshToken,
      });
    } else {
      res.status(StatusCodes.UNAUTHORIZED).json({
        message: "!unauthorized",
      });
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error",
    });
  }
};

export const useController = {
  login,
};

import { StatusCodes } from "http-status-codes";
import { generateToken, verifyToken } from "../providers/jwtProvider.js";

const user = {
  email: "admin@gmail.com",
  password: "123123123",
};

const login = async (req, res) => {
  try {
    const { body } = req.body;

    if (body.identify === user.email && body.password === user.password) {
      const payload = {
        identify: body.identify,
      };
      const accessToken = await generateToken(
        payload,
        process.env.SECRET_ACCESS_KEY,
        "10s"
      );

      const refreshToken = await generateToken(
        payload,
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

const access = (req, res) => {
  try {
    res.status(StatusCodes.OK).json({ data: [{ name: "Hoai Nam" }] });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Server internal",
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    const { body } = req.body;
    const refreshToken = body.refreshToken;
    const decoded = await verifyToken(
      refreshToken,
      process.env.SECRET_REFRESH_KEY
    );

    const payload = {
      identity: decoded.identify,
    };

    const accessToken = await generateToken(
      payload,
      process.env.SECRET_ACCESS_KEY,
      "10s"
    );

    res.status(StatusCodes.OK).json({
      userInfo: decoded,
      accessToken: accessToken,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Server internal",
    });
  }
};

export const useController = {
  access,
  login,
  refreshToken,
};

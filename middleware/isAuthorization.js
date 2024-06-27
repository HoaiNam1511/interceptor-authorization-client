import { StatusCodes } from "http-status-codes";
import { verifyToken } from "../providers/jwtProvider.js";

const isAuthorization = async (req, res, next) => {
  const accessToken = req.headers.authorization;

  if (accessToken) {
    accessToken.replace("Bearer ", "");

    try {
      const decode = await verifyToken(
        accessToken,
        process.env.SECRET_ACCESS_KEY
      );

      if (!decode) {
        res.status(StatusCodes.UNAUTHORIZED).json({
          message: "Unauthorized!",
        });
      }

      req.jwtDecoded = decode;

      next();
    } catch (error) {
      if (error.message.includes("jwt expired")) {
        res.status(StatusCodes.GONE).json({
          message: "Token expired middleware!",
        });
      }
      res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Unauthorized, please login",
      });
    }
  } else {
    res.status(StatusCodes.UNAUTHORIZED).json({
      message: "Not have token",
    });
  }
};

export default isAuthorization;

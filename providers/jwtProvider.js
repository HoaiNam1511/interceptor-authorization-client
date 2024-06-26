import jwt from "jsonwebtoken";

export const generateToken = async (payload, secretKey, tokenLife) => {
  try {
    return jwt.sign(payload, secretKey, {
      algorithm: "HS256",
      expiresIn: tokenLife,
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const verifyToken = async (token, secretKey) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    throw new Error(error);
  }
};

import { User } from "@/types";
import * as jwt from "jsonwebtoken";

export const generateToken = (user: User) => {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
  };
  const secretKey = process.env.EXPO_JWT_SECRET || "your_jwt_secret_key"; 

  const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
  const refreshToken = jwt.sign(payload, secretKey, { expiresIn: "7d" });
  return { token, refreshToken };
};

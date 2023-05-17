import { config } from "dotenv";

config();

export const env = {
  port: process.env.PORT || 1337,
  accessKey: process.env.ACCESS_KEY,
  webClientUrl: process.env.WEB_CLIENT_URL || "http://localhost:3000"
};

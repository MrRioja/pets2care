import jwt from "jsonwebtoken";
const authconfig = require("../config/auth");

export async function generateToken(params = {}) {
  return jwt.sign(params, authconfig.secret, {
    expiresIn: 86400,
  });
}

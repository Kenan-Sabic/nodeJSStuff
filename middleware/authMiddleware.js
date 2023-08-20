import jwt from "jsonwebtoken";
import { SECRET } from "../constants.js";

const authMiddleware = (req, res, next) => {
  console.log(req.headers);
  const token = req.headers["x-access-token"];
  try {
    jwt.verify(token, SECRET);
    next();
  } catch (e) {
    console.log(e);
    res.status(403).send("Unauthorized something something");
  }
};

export default authMiddleware;

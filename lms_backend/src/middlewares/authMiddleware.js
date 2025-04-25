import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization"); 
  if (!token) {
    return res.status(401).json({status:401,message: "Access denied. No token provided."});
  }
  try {
    const verified = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET); 
    req.user = verified; 
    next(); 
  } catch (error) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};

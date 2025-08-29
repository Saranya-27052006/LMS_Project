import type { Request, Response, NextFunction } from "express";
import authService from "../services/AuthService"

export const authenticate = (req: Request, res: Response, next: NextFunction) => {

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  const decoded = authService.verifyToken(token) as { id: string; role?: string };
  if (!decoded) return res.status(401).json({ message: "Invalid or expired token" });
  console.log(decoded);

  req.user = decoded;
  next();
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;
  if (!user || user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

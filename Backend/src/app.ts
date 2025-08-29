import express, { type NextFunction, type Request, type Response } from "express";

export const app = express();
app.use(express.json());
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Something went wrong",
  });
});

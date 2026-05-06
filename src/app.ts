// src/app.ts
import express, { Request, Response } from "express";
import router from "./routes.js";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response): void => {
  res.json({ message: "API CORRIENDO" });
});

app.use("/api", router);

export default app;
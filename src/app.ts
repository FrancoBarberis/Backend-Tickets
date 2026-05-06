// src/app.ts
import express, { Request, Response } from "express";
import ticketsRoutes from "./modules/tickets/ticket.routes.js";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response): void => {
  res.json({ message: "API CORRIENDO" });
});

app.use("/api/tickets", ticketsRoutes);

export default app;
// src/app.js
import express from "express";
import ticketsRoutes from "./modules/tickets/ticket.routes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API CORRIENDO" });
});

app.use("/api/tickets", ticketsRoutes);

export default app;
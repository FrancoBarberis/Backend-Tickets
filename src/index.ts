// src/index.ts
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT: number = parseInt(process.env.PORT || "3001", 10);

app.listen(PORT, (): void => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
// src/index.ts
import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { pool } from "./config/database.js";

const PORT: number = parseInt(process.env.PORT || "3001", 10);

app.listen(PORT, async (): Promise<void> => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log(`PostgreSQL conectado exitosamente (${res.rows[0].now})`);
    console.log(`Servidor escuchando en puerto ${PORT}`);
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
});
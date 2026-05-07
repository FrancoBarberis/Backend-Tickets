// user.controller.ts
import { Request, Response } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser
} from "./user.service.js";

export async function getUsersController(_req: Request, res: Response) {
  const users = await getAllUsers();
  res.json(users);
}
export function getUserByIdController(req: Request, res: Response) {
  const { id } = req.params;

  if (typeof id !== "string" || !id) {
    return res.status(400).json({ error: "ID de usuario inválido" });
  }

  const user = getUserById(id);

  if (!user) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  res.json(user);
}

export function registerUserController(req: Request, res: Response) {
  const { name, email, role } = req.body;

  const allowedRoles = ["user", "admin"]; // Adjust allowed roles as needed
  const sanitizedRole = allowedRoles.includes(role) ? role : "user";

  if (!name || !email) {
    return res.status(400).json({
      error: "El nombre y el correo electrónico son obligatorios"
    });
  }

  const user = createUser({ name, email, role: sanitizedRole });
  res.status(201).json(user);
}

export function editUserController(req: Request, res: Response) {
  const { id } = req.params;

  if (typeof id !== "string" || !id) {
    return res.status(400).json({ error: "ID de usuario inválido" });
  }

  const user = updateUser(id, req.body);

  if (!user) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  res.json(user);
}
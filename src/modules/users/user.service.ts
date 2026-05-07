// User service
// user.service.ts
import { User } from "./user.model.js";

const users: User[] = [];

export function getAllUsers(): User[] {
  return users;
}

export function getUserById(id: string): User | null {
  return users.find(u => u.id === id) ?? null;
}

export function createUser(data: {
  name: string;
  email: string;
  role?: string;
}): User {
  const user: User = {
    id: crypto.randomUUID(),
    name: data.name,
    email: data.email,
    role: data.role ?? "USER",
    createdAt: new Date()
  };

  users.push(user);
  return user;
}

export function updateUser(
  id: string,
  updates: Partial<User>
): User | null {
  const user = users.find(u => u.id === id);
  if (!user) return null;

  Object.assign(user, updates);
  return user;
}
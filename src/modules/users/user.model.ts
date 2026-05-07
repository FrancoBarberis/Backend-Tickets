// User model
import { UUID } from "node:crypto";

export interface User {
  id: UUID;
  name: string;
  email: string;
  role: "USER" | "AGENT" | "ADMIN";
  createdAt: Date;
}

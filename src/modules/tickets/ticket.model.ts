// Ticket model
import { UUID } from "node:crypto";

export interface Ticket {
  id: UUID;
  description: string;
  shortDescription: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
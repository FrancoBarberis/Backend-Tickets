// Ticket model
import { UUID } from "node:crypto";

export type TicketState = 'NEW' | 'IN_PROGRESS' | 'ON_HOLD' | 'RESOLVED' | 'CLOSED' | 'CANCELED';
export type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface Ticket {
  id: UUID;
  shortDescription: string;
  description: string;
  state: TicketState;
  priority: TicketPriority;
  requesterId?: UUID; // Simulando FK a Usuarios en Postgres
  assigneeId?: UUID;  // Simulando FK a Usuarios en Postgres
  createdAt: Date;
  updatedAt: Date;
}
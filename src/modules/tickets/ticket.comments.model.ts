import { UUID } from "node:crypto";

export interface Comment {
  id: UUID;
  ticketId: UUID;
  text: string;
  authorId: UUID;     // después puede ser User.id
  createdAt: Date;
}

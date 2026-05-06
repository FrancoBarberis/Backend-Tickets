// Ticket service
import { randomUUID } from "crypto";

// BD SIMULADA EN CACHE
const tickets = [];

export function findAllTickets() {
  return tickets;
}

export function createNewTicket({ shortDescription, description }) {
  const ticket = {
    id: randomUUID(),
    shortDescription,
    description: description || "",
    status: "OPEN",
    createdAt: new Date()
  };

  tickets.push(ticket);
  return ticket;
}
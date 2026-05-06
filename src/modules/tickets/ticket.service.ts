// Ticket service
import { Ticket } from "./ticket.model.js";
import { Comment } from "./ticket.comments.model.js";
import { randomUUID, UUID } from "crypto";

interface TicketInput {
    shortDescription: string;
    description?: string;
}

// BD SIMULADA EN CACHE
const tickets: Ticket[] = [];
const comments: Comment[] = [];

export function findAllTickets(): Ticket[] {
    return tickets;
}

export function createNewTicket({ shortDescription, description }: TicketInput): Ticket {
    const ticket: Ticket = {
        id: randomUUID(),
        description: description || "",
        shortDescription: shortDescription,
        status: "OPEN",
        createdAt: new Date(),
        updatedAt: new Date()
    };

    tickets.push(ticket);
    return ticket;
}

export function findTicketWithId(id:UUID){
    return tickets.find(ticket => ticket.id === id);
}

export function getTicketComments(id:UUID){
    return ;
}

export function postTicketComment(){
    return null;
}
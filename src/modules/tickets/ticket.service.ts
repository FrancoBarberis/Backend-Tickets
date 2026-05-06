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
        id: randomUUID() as UUID,
        description: description || "",
        shortDescription: shortDescription,
        state: "NEW",       // Usando el nuevo modelo
        priority: "LOW",    // Por defecto en la creación
        createdAt: new Date(),
        updatedAt: new Date()
    };

    tickets.push(ticket);
    return ticket;
}

export function findTicketWithId(id: UUID) {
    return tickets.find(ticket => ticket.id === id);
}

export function findTicketComments(id: UUID) {
    return comments.filter(c => c.ticketId === id); // Fix minimal para devolver algo real si coincide
}

export function createTicketComment(id: UUID, commentText: string) {
    const ticket = findTicketWithId(id);
    if (!ticket) {
        return null;
    }

    const newComment: Comment = {
        id: randomUUID() as UUID,
        ticketId: id,
        text: commentText,
        authorId: randomUUID() as UUID, // TODO: obtener del usuario autenticado
        createdAt: new Date()
    };

    comments.push(newComment);
    return newComment;
}
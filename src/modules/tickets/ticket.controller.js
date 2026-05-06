// Ticket controller
import {
    findAllTickets,
    createNewTicket
} from "./ticket.service.js"

export function getAllTickets (req,res) {
    const tickets = findAllTickets ();
    res.json(tickets);
}

export function createTicket (req,res) {
    const { shortDescription, description} = req.body;
    if(!shortDescription){
        return res.status(400).json({
            error: "shortDescription es obligatorio"
        });
    }
    const ticket = createNewTicket({ shortDescription, description });
    res.status(201).json(ticket);
}
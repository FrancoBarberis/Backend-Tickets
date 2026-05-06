// Ticket routes
import { Router } from "express";

import {
    getAllTickets,
    createTicket,
    getTicketWithId,
    getTicketComments,
    postTicketComment
} from "./ticket.controller.js";

const router = Router();

//GET /api/tickets
router.get("/", getAllTickets);

//POST /api/tickets
router.post("/", createTicket);

// GET /api/tickets/:id
router.get("/:id", getTicketWithId);

// GET /api/tickets/:id/comments
router.get("/:id/comments", getTicketComments);

// POST /api/tickets/:id/comments
router.post("/:id/comments", postTicketComment);

export default router;
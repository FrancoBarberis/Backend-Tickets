// User routes
import { Router, Request, Response } from "express";
import {
    getUserByIdController,
    getUsersController,
    registerUserController,
    editUserController
} from "./user.controller.ts";

const router = Router();

//GET /api/users
router.get("/", getUsersController);

//GET /api/users/me
router.get("/me", (req: Request, res: Response) => {
    res.json({ message: "ToDo" });
});

//GET /api/users/:id
router.get("/:id", getUserByIdController);

//POST /api/users
router.post("/", registerUserController);

//PUT /api/users/:id
router.put("/:id", editUserController);

export default router;
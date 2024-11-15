import express from "express";
import * as clientController from "../controllers/clientController.js";

const router = express.Router();

// Move the search route before the general routes
router.get("/users/search", clientController.searchUsers);

// General routes
router.get("/users", clientController.getUsers);
router.post("/users", clientController.createUser);
router.put("/users/:id", clientController.updateUser);
router.delete("/users/:id", clientController.deleteUser);
export default router;

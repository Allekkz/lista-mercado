import { Router } from "express";
import { ItemController } from "../controllers/ItemController";
import { authMiddleware } from "../middlewares/auth";

const router = Router();
const itemController = new ItemController();

router.post("/register", authMiddleware, itemController.registrar);
router.get("/listar", authMiddleware, itemController.listarItens);
router.delete("/deletar/:itemId", authMiddleware, itemController.deletarItem);

export default router;
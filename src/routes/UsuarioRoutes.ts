import { Router } from "express";
import { UsuarioController } from "../controllers/UsuarioController";


const router = Router();
const usuarioController = new UsuarioController();

router.post("/register", usuarioController.registrar);
router.post("/login", usuarioController.login)

export default router;
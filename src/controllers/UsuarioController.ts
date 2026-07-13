import type { Request, Response } from "express";
import { UsuarioService } from "../services/UsuarioService"
import { Register } from "../dtos/usuarios/RegisterDTO";
import { Login } from "../dtos/usuarios/LoginDTO";


const service = new UsuarioService();

export class UsuarioController {

    async registrar(req: Request, res: Response) {
        try {
            const dadosValidos = Register.parse(req.body);
            const novoUsuario = await service.registrar(dadosValidos);
            return res.status(201).json(novoUsuario);
        } catch (error: any) {
            if (error.name === "ZodError") {
                return res.status(400).json({ erro: error.format() });
            }

            return res.status(500).json({ erro: error.message });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const dadosValidos = Login.parse(req.body);
            const usuario = await service.login(dadosValidos);
            return res.json(usuario);
        } catch (error: any) {
            if (error.name === "ZodError") {
                return res.status(400).json({ erro: error.format() });
            }

            return res.status(500).json({ erro: error.message });
        }
    }

}
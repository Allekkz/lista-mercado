import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SEGREDO_DO_JWT = process.env.JWT_SECRET;

interface TokenPayload {
    id: number;
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ erro: "Acesso negado. Token não fornecido" });
    }

    try {
        const dadosDecodificados = jwt.verify(token, SEGREDO_DO_JWT!) as TokenPayload;
        (req as any).usuarioId = dadosDecodificados.id;
        return next();
    } catch (error) {
        return res.status(403).json({ erro: "Token inválido ou expirado" });
    }
}
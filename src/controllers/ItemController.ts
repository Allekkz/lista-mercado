import type { Request, Response } from "express";
import { ItemService } from "../services/ItemService";
import { RegisterItem } from "../dtos/itens/RegisterItemDTO";

const service = new ItemService();

export class ItemController {

    async registrar(req: Request, res: Response) {
        try {
            const dadosValidos = RegisterItem.parse(req.body);
            const novoItem = await service.registrarItem(dadosValidos);
            return res.status(201).json(novoItem);
        } catch (error: any) {
            if (error.name === "ZodError") {
                return res.status(400).json({ erro: error.format() });
            }

            return res.status(500).json({ erro: error.message });
        }
    }

    async listarItens(req: Request, res: Response) {
        try {
            const itens = await service.listarItens();
            return res.json(itens);
        } catch (error: any) {
            return res.status(500).json({ erro: error.message });
        }
    }

    async deletarItem(req: Request, res: Response) {
        try {
            const itemId = Number(req.params.itemId);

            if (isNaN(itemId)) {
                return res.status(400).json({ erro: "IDs informados são inválidos" });
            }

            const resultado = await service.deletarItem(itemId);

            return res.json(resultado);
        } catch (error: any) {
            return res.status(500).json({ erro: error.message });
        }
    }

}
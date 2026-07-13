import { prisma } from "../../lib/prisma";
import type { RegisterItemDTO } from "../dtos/itens/RegisterItemDTO";


export class ItemService {

    async registrarItem(data: RegisterItemDTO) {
        const item = await prisma.items.create({
            data: {
                nome: data.nome
            },
            select: {
                id: true,
                nome: true,
                createdAt: true
            }
        });

        return item;
    }

    async listarItens() {
        const itens = await prisma.items.findMany({
            select: {
                id: true,
                nome: true,
                createdAt: true
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        return itens;
    }

    async deletarItem(itemId: number) {
        const itemExiste = await prisma.items.findUnique({
            where: {
                id: itemId
            },
            select: {
                id: true
            }
        });

        if (!itemExiste) {
            throw new Error("O item que você esta tentando deletar não existe");
        }

        await prisma.items.delete({
            where: {
                id: itemExiste.id
            }
        });

        return {
            mensagem: "Item deletado com sucesso"
        };
    }

}
import { z } from "zod";

export const RegisterItem = z.object({
    nome: z.string().min(3, "O nome é obrigatório"),
});

export type RegisterItemDTO = z.infer<typeof RegisterItem>;
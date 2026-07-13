import { z } from "zod";

export const Login = z.object({
    email: z.string().email("Por favor, insira um email válido"),
    senha: z.string().min(6)
});

export type LoginDTO = z.infer<typeof Login>;
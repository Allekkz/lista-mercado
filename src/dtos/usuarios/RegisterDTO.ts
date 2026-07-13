import { z } from "zod";

export const Register = z.object({
    nome: z.string().min(3, "Por favor, insira um nome válido"),
    email: z.string().email("Por favor, insira um email válido"),
    senha: z.string().min(6, "Informe uma senha segura")
});

export type RegisterDTO = z.infer<typeof Register>;
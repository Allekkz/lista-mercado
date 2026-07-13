import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";
import type { RegisterDTO } from "../dtos/usuarios/RegisterDTO";
import type { LoginDTO } from "../dtos/usuarios/LoginDTO";
import jwt from "jsonwebtoken";

export class UsuarioService {

    async registrar(data: RegisterDTO) {

        const usuarioExiste = await prisma.usuario.findUnique({
            where: {
                email: data.email
            },
            select: {
                id: true
            }
        });

        if (usuarioExiste) {
            throw new Error("Este email já está cadastrado");
        }

        const hash = await bcrypt.hash(data.senha, 10);

        const usuario = await prisma.usuario.create({
            data: {
                nome: data.nome,
                email: data.email,
                senha: hash
            },
            select: {
                nome: true,
                email: true
            }
        });

        return usuario

    }

    async login(data: LoginDTO) {

        const usuario = await prisma.usuario.findUnique({
            where: {
                email: data.email
            }
        });

        if (!usuario) {
            throw new Error("Login ou senha inválidos");
        }

        const senhaValida = await bcrypt.compare(data.senha, usuario.senha);

        if (!senhaValida) {
            throw new Error("Login ou senha inválidos");
        }

        const secret = process.env.JWT_SECRET;

        if (!secret) {
            throw new Error("Erro interno do servidor: Chave de autenticação não configurada");
        }

        const token = jwt.sign(
            { id: usuario.id },
            secret,
            { expiresIn: "1d" }
        );

        return {
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
            },
            token
        };

    }

}
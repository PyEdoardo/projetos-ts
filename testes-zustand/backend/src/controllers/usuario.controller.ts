import { db } from "../prisma/prisma";

import type { Request, Response } from "@tinyhttp/app";
import type { Usuario } from "@prisma/client";

export type UsuarioLogin = Omit<Usuario, "id" | "nome" | "telefone" | "criadoQuando" | "atualizadoQuando">

/**
 * 
 * Colinha de http status
 * 201 Created, é pra quando criou algo, inseriu algo novo no banco
 * 400 Bad Request, quando o front manda no body ou params coisas que o back não espera
 * 404 Not Found, preciso msm dizer oq é?
 * 409 Conflict, quando o front manda algo que já tem cadastrado por exemplo
 * 500 Internal Server Error, sla eu uso sempre que algo não salva no banco por exemplos, erro mais genérico no server
 */

export const criarUsuario = async (req: Request, res: Response): Promise<void> => {
    const { nome, senha, email, telefone }: Omit<Usuario, "id"> = req.body;

    if (!nome || !senha || !email || !telefone) {
        res.status(400).send("Body faltando");
        return;
    };

    const senhaNova = await Bun.password.hash(senha);
    
    const jaExiste = await db.usuario.findFirst({
        where: {
            email
        }
    });

    if (jaExiste) {
        res.status(409).send("Já existe esse usuario cadastrado");
        return;
    }

    const usuario = await db.usuario.create({
        data: {
            nome,
            senha: senhaNova,
            email,
            telefone
        },
        select: {
            nome: true,
            email: true,
            senha: false,
            telefone: true,
            id: true,
            criadoQuando: true
        }
    });

    if (!usuario) {
        res.status(500).send("Erro ao Criar Usuário");
        return;
    }

    res.status(201).json({ usuario });
    return;
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, senha }: UsuarioLogin = req.body;

    if (!email || !senha) {
        res.status(400).send("Body Faltando");
        return;
    };

    const usuario = await db.usuario.findFirst({
        where: {
            email
        }
    });

    if (!usuario) {
        res.status(404).send("Usuário não encontrado");
        return;
    }

    const valido = await Bun.password.verify(senha, usuario.senha);

    if (!valido) {
        res.status(401).send("Não autorizado");
        return; 
    }

    res.status(200).json(usuario);
    return;
};
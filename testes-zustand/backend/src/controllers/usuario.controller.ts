import { db } from "../prisma/prisma";

import type { Request, Response } from "@tinyhttp/app";
import type { Usuario } from "@prisma/client";

/**
 * 
 * Colinha de http status
 * 400 Bad Request, quando o front manda no body ou params coisas que o back não espera
 * 409 Conflict, quando o front manda algo que já tem cadastrado por exemplo
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
        res.status()
    }
};
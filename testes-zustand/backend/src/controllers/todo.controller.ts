import type { Request, Response } from "@tinyhttp/app";
import type { Todo } from "@prisma/client";
import { db } from "../prisma/prisma";

export const criarTodo = async (req: Request, res: Response) => {
    const { nome, descricao, categoria, idUsuario }: Omit<Todo, "id" | "foiFeito"> = req.body;

    if (!nome || !descricao || !categoria || !idUsuario) {
        res.status(400).send("Faltando parametros");
        return;
    };

    const existeUsuario = await db.usuario.findUnique({
        where: {
            id: idUsuario
        }
    });

    if (!existeUsuario) {
        res.status(404).send("Usuário não existe");
        return;
    };

    const todo = await db.todo.create({
        data: {
            nome,
            descricao,
            categoria,
            idUsuario
        }
    });

    res.status(201).json(todo);
    return;
};

export const pegarTodos = async (_req: Request, res: Response) => {
    res.json(await db.todo.findMany());
};

//todos/:id
export const pegarTodosId = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        res.status(400).send("Faltando Id");
        return;
    };

    const todo = await db.todo.findUnique({
        where: {
            id: Number(id)
        }
    });

    if (!todo) {
        res.status(404).send("Todo Não encontrado");
        return;
    }

    res.status(200).json(todo);
    return;
};

//todos/:idUsuario
export const pegarTodosIdUsuario = async (req: Request, res: Response) => {
    const { idUsuario } = req.params;

    if (!idUsuario) {
        res.status(400).send("Faltando idUsuario");
    };

    const usuario = await db.usuario.findUnique({
        where: {
            id: idUsuario
        }
    });

    if (!usuario) {
        res.status(404).send("Usuário não encontrado");
    };

    const todos: Todo[] = await db.todo.findMany({
        where: {
            idUsuario
        }
    });

    res.status(200).json(todos);
    return;
};

export const completarTarefa = async (req: Request, res: Response) => {
    const { id } = req.body;

    if (!id) {
        res.status(400).send("Faltando ID");
    };

    const todo = await db.todo.update({
        where: {
            id
        },
        data: {
            foiFeito: true
        }
    });

    res.status(200).json(todo);

    return;
};
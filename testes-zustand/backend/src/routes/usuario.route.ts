import { App, type Response, type Request } from "@tinyhttp/app";
import { criarUsuario, login } from "../controllers/usuario.controller";
import { db } from "../prisma/prisma";

export const usuarioRoute = new App();

usuarioRoute.post("/usuario", criarUsuario);
usuarioRoute.post("/login", login);

//Só pra testes
usuarioRoute.get("/usuario", async (_req: Request, res: Response) => {
    res.json(db.usuario.findMany());
});
usuarioRoute.get("/usuario/:email", async (req: Request, res: Response) => {
    const email = req.params.email;

    if (!email) {
        res.status(400).send("Faltando Email");
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

    res.status(200).json(usuario);
    return;
});
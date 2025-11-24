import { App } from "@tinyhttp/app";
import { json } from "milliparsec";
import { todoRoute } from "./controllers/todo.route";
import { usuarioRoute } from "./routes/usuario.route";

const app = new App();

app.use(json());

app.use("/api", todoRoute);
app.use("/api", usuarioRoute);

app.listen(3000, async () => {
    console.log("Servidor rodando na porta 3000");
});

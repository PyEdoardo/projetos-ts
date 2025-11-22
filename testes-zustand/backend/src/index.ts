import { App } from "@tinyhttp/app";
import { json } from "milliparsec";

const app = new App();

app.use(json());

app.listen(3000, async () => {
    console.log("Servidor rodando na porta 3000");
});

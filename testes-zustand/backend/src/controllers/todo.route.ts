import { App } from "@tinyhttp/app";
import { completarTarefa, criarTodo, pegarTodos, pegarTodosId, pegarTodosIdUsuario } from "./todo.controller";

export const todoRoute = new App();

todoRoute.post("/todo", criarTodo);
todoRoute.get("/todo", pegarTodos);

todoRoute.post("/todo/completar", completarTarefa);

todoRoute.get("/todo/usuario/:idUsuario", pegarTodosIdUsuario);
todoRoute.get("/todo/:id", pegarTodosId);


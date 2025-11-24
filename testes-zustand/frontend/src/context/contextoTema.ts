import { createContext } from "react";
import { type ContextoTemaType } from "./contextoTema.Provider";

export const ContextoTema = createContext<ContextoTemaType | undefined>(
    undefined,
);

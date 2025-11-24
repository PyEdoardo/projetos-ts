import { useEffect, useState, type ReactNode } from "react";
import { ContextoTema } from "./contextoTema";

export type ContextoTemaType = {
    darkMode: boolean;
    ligarDarkMode: () => void;
};

export const ProvedorTema = ({ children }: { children: ReactNode }) => {
    const [darkMode, setDarkMode] = useState<boolean>(() => {
        const salvo = localStorage.getItem("darkMode");
        if (salvo !== null) return salvo === "true";
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("darkMode", String(darkMode));
    }, [darkMode]);

    const ligarDarkMode = () => setDarkMode(!darkMode);

    return (
        <ContextoTema.Provider value={{ darkMode, ligarDarkMode }}>
            {children}
        </ContextoTema.Provider>
    );
};

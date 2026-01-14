import { apiLogin } from "@/api/user";
import type { UserStore } from "@/types/user";
import { create } from "zustand";

export const useUserStore = create<UserStore>((set, get) => ({
    user: null,

    login: async (email) => {
        const userApi = await apiLogin(email);

        if (userApi === null) return false;

        set( { user: userApi });
        return true;
    },

    logoff: () => {
        const { user } = get()
        if (user === null) return false;
        set({ user: null });
        return true;
    }
}));
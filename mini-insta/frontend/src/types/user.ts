type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    
};

type UserStore = {
    user: User | null;
    login: (email: string) => Promise<boolean>;
    logoff: () => boolean;
}

export type { User, UserStore };
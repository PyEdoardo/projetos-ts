import type { User } from '@/types/user';
import axios from 'axios';

export const apiLogin = async (email: string): Promise<User | null> => {
    if (email === null) return null;
    const user: User | null = await axios.get(`https://jsonplaceholder.typicode.com/users?email=${email}`);

    if (user === null) return null;
    return user;
};
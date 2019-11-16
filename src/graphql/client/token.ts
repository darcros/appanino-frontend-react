const TOKEN_STORAGE_KEY = 'token';

export const saveToken = (token: string) => localStorage.setItem(TOKEN_STORAGE_KEY, token);
export const getToken = () => localStorage.getItem(TOKEN_STORAGE_KEY);
export const removeToken = () => localStorage.removeItem(TOKEN_STORAGE_KEY);

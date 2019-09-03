export const saveToken = (token: string) => localStorage.setItem('token', token);
export const getToken = () => localStorage.getItem('token');
export const loggedIn = () => !!getToken();
export const removeToken = () => localStorage.removeItem('token');

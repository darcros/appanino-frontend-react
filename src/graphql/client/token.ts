export const getToken = () => localStorage.getItem('token');
export const loggedIn = () => !!getToken();
export const removeToken = () => localStorage.removeItem('token');

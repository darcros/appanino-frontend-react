export const getToken = () => localStorage.getItem('token');
export const loggedIn = () => !!getToken();

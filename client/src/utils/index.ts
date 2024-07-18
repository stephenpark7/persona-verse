export function getLocalStorageToken() {
  const token = localStorage.getItem('token');
  return token ? JSON.parse(token) : null;
}

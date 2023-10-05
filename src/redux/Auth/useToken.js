const useToken = () => {
  const token = localStorage.getItem('token');
  if (token) return token;
  return false;
};
export default useToken;

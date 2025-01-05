import axiosInstance from '@/api/axios-instance';

const useAuth = () => {
  const login = async (payload) => {
    const { data } = await axiosInstance.post('/auth/login', payload);
    return data;
  };

  const logout = async () => {
    const { data } = await axiosInstance.post('/auth/logout');
    if (data.statusCode === 200) {
      localStorage.removeItem('user');
    }
  };

  return {
    login,
    logout,
  };
};

export default useAuth;

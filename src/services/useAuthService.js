import axiosInstance from '@/api/axiosInstance';

const useAuthService = () => {
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

export default useAuthService;

import axiosInstance from '@/api/axios-instance';

const usePayment = () => {
  const create = async (payload) => {
    const { data } = await axiosInstance.post('/payments', payload);
    return data;
  };

  const getById = async (id) => {
    const { data } = await axiosInstance.get(`/payments/${id}`);
    return data;
  };
  
  const getAll = async (query) => {
    const { data } = await axiosInstance.get('/payments', { params: query });
    return data;
  };

  return {
    create,
    getById,
    getAll,
  };
};

export default usePayment;

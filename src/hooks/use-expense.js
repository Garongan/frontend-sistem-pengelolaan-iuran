import axiosInstance from '@/api/axios-instance';

const useExpense = () => {
  const create = async (payload) => {
    const { data } = await axiosInstance.post('/expenses', payload);
    return data;
  };

  const getById = async (id) => {
    const { data } = await axiosInstance.get(`/expenses/${id}`);
    return data;
  };

  const getAll = async (query) => {
    const { data } = await axiosInstance.get('/expenses', { params: query });
    return data;
  };
  return {
    create,
    getById,
    getAll,
  };
};

export default useExpense;

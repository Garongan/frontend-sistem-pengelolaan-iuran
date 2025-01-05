import axiosInstance from '@/api/axios-instance';

const useHouse = () => {
  const getAll = async (query) => {
    const { data } = await axiosInstance.get('/houses', { params: query });
    return data;
  };

  const getById = async (id) => {
    const { data } = await axiosInstance.get(`/houses/${id}`);
    return data;
  };

  const create = async (payload) => {
    const { data } = await axiosInstance.post('/houses', payload);
    return data;
  };

  const deleteById = async (id) => {
    const { data } = await axiosInstance.delete(`/houses/${id}`);
    return data;
  };

  const updateById = async (id, payload) => {
    const { data } = await axiosInstance.put(`/houses/${id}`, payload);
    return data;
  };

  return {
    getAll,
    getById,
    create,
    deleteById,
    updateById,
  };
};

export default useHouse;

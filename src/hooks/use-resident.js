import axiosInstance from '@/api/axios-instance';

const useResident = () => {
  const getAll = async (query) => {
    const { data } = await axiosInstance.get('/residents', { params: query });
    return data;
  };

  const create = async (payload) => {
    const { data } = await axiosInstance.post('/residents', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  };

  const deleteById = async (id) => {
    const { data } = await axiosInstance.delete(`/residents/${id}`);
    return data;
  };

  const updateById = async (id, payload) => {
    const { data } = await axiosInstance.post(`/residents/${id}`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  };

  const getById = async (id) => {
    const { data } = await axiosInstance.get(`/residents/${id}`);
    return data;
  };

  return {
    getAll,
    create,
    deleteById,
    updateById,
    getById,
  };
};

export default useResident;

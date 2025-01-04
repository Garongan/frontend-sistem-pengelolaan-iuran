import axiosInstance from '@/api/axiosInstance';

const useResidentService = () => {
  const getAll = async () => {
    const { data } = await axiosInstance.get('/residents');
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
    const { data } = await axiosInstance.put(`/residents/${id}`, payload);
    return data;
  };

  const getById = async (id) => {
    const { data } = await axiosInstance.get(`/residents/${id}`);
    return data;
  };

  const getImage = async (url) => {
    const { data } = await axiosInstance.get(`/images/${url}`);
    return data;
  };

  return {
    getAll,
    create,
    deleteById,
    updateById,
    getById,
    getImage,
  };
};

export default useResidentService;

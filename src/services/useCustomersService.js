import axiosInstance from "@/api/axiosInstance";

const useCustomersService = () => {
    const create = async (payload) => {
        const { data } = await axiosInstance.post("/customers", payload);
        return data;
    };
    const updateById = async (id, payload) => {
        const { data } = await axiosInstance.put(`/customers/${id}`, payload);
        return data;
    };
    const deleteById = async (id) => {
        const { data } = await axiosInstance.delete(`/customers/${id}`);
        return data;
    };
    const getById = async (id) => {
        const { data } = await axiosInstance.get(`/customers/${id}`);
        return data;
    };
    const getAll = async (query) => {
        const { data } = await axiosInstance.get("/customers", { params: query });
        return data;
    };
    return {
        create,
        updateById,
        deleteById,
        getById,
        getAll,
    };
};

export default useCustomersService;

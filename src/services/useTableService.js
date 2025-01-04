import axiosInstance from "@/api/axiosInstance";

const useTableService = () => {
    const getAll = async () => {
        const { data } = await axiosInstance.get("/tables");
        return data;
    };

    const create = async (payload) => {
        const { data } = await axiosInstance.post("/tables", payload);
        return data;
    };

    const deleteById = async (id) => {
        const { data } = await axiosInstance.delete(`/tables/${id}`);
        return data;
    };

    const updateById = async (id, payload) => {
        const { data } = await axiosInstance.put(`/tables/${id}`, payload);
        return data;
    };

    const getById = async (id) => {
        const { data } = await axiosInstance.get(`/tables/${id}`);
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

export default useTableService;

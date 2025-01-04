import axiosInstance from "@/api/axiosInstance";

const useMenuService = () => {
    const getAll = async (query) => {
        const { data } = await axiosInstance.get("/menus", {params: query});
        return data;
    };

    const getById = async (id) => {
        const { data } = await axiosInstance.get(`/menus/${id}`);
        return data;
    };

    const create = async (payload) => {
        const { data } = await axiosInstance.post("/menus", payload);
        return data;
    };

    const deleteById = async (id) => {
        const { data } = await axiosInstance.delete(`/menus/${id}`);
        return data;
    };

    const updateById = async (id, payload) => {
        const { data } = await axiosInstance.put(`/menus/${id}`, payload);
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

export default useMenuService;

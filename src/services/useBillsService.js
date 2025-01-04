import axiosInstance from "@/api/axiosInstance";

const useBillsService = () => {
    const create = async (payload) => {
        const { data } = await axiosInstance.post("/bills", payload);
        return data;
    };
    const getAll = async (query) => {
        const { data } = await axiosInstance.get("/bills", { params: query });
        return data;
    };
    return {
        create,
        getAll,
    };
};

export default useBillsService;

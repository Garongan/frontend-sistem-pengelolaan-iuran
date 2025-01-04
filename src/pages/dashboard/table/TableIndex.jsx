import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import useTableService from "@/services/useTableService";
import {
    QueryClient,
    QueryClientProvider,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import TableList from "./TableList";
import LoaderList from "@/shared/LoaderList";

const queryClient = new QueryClient();

const TableIndex = ({ title }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <DataList title={title} />
        </QueryClientProvider>
    );
};

const DataList = ({ title }) => {
    const queryClient = useQueryClient();
    const { getAll, deleteById } = useTableService();

    const handleGetAll = async () => {
        let data = await getAll();
        data = {
            ...data,
            name: data.data.sort((a, b) => a.name.localeCompare(b.name)),
        };
        return data;
    };

    const { data, isSuccess } = useQuery({
        queryKey: ["tables"],
        queryFn: handleGetAll,
    });

    const deleteItem = useMutation({
        mutationFn: deleteById,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tables"] });
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Upsss! Terdapat Kesalahan Server.",
                description: error.message,
            });
        },
    });

    if (!isSuccess) return <LoaderList />;

    return (
        <>
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight pb-4">
                    {title}
                </h2>
            </div>
            <Link to="/dashboard/table/new" className="pb-4">
                <Button className="mb-4">New Table</Button>
            </Link>
            <TableList data={data?.data} deleteItem={deleteItem} />
        </>
    );
};

TableIndex.propTypes = {
    title: PropTypes.string,
};

DataList.propTypes = {
    title: PropTypes.string,
};

export default TableIndex;

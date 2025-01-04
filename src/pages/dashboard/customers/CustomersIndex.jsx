import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import useCustomersService from "@/services/useCustomersService";
import LoaderList from "@/shared/LoaderList";
import PageSize from "@/shared/PageSize";
import PaginationComponent from "@/shared/PaginationComponent";
import {
    QueryClient,
    QueryClientProvider,
    keepPreviousData,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import { Search } from "lucide-react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router-dom";
import CustomersList from "./CustomersList";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const queryClient = new QueryClient();
const CustomersIndex = ({ title }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <DataList title={title} />
        </QueryClientProvider>
    );
};

const DataList = ({ title }) => {
    const queryClient = useQueryClient();
    const { getAll, deleteById } = useCustomersService();
    const [searchParams, setSearchParams] = useSearchParams();
    const name = searchParams.get("name") || "";
    const direction = searchParams.get("direction") || "asc";
    const sortBy = searchParams.get("sortBy") || "name";
    const page = searchParams.get("page") || 1;
    const size = searchParams.get("size") || 10;
    const [paging, setPaging] = useState({
        totalPages: 0,
        totalElement: 1,
        page: page,
        size: size,
        hasNext: false,
        hasPrevious: false,
    });

    const searchForm = useForm({
        defaultValues: {
            search: "",
        },
    });

    const onSubmitSearch = (data) => {
        console.log(data);
        setSearchParams({
            ...searchParams,
            name: data.search,
        });
    };

    const handleChangeDirection = (direction) => {
        setSearchParams({
            ...searchParams,
            direction: direction,
        });
    };

    const handleChangePageSize = (size) => {
        setSearchParams({
            ...searchParams,
            size: size,
        });
    };

    const { data, isSuccess } = useQuery({
        queryKey: ["customers", name, direction, sortBy, page, size],
        queryFn: async () => {
            return await getAll({
                name: name,
                direction: direction,
                sortBy: sortBy,
                page: page,
                size: size,
            });
        },
        placeholderData: keepPreviousData,
        staleTime: 5000,
    });

    const deleteItem = useMutation({
        mutationFn: deleteById,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["customers"] });
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Upsss! Terdapat Kesalahan Server.",
                description: error.message,
            });
        },
    });

    useEffect(() => {
        if (isSuccess) {
            setPaging(data?.paginationResponse);
        }
    }, [data, isSuccess]);

    if (!isSuccess) return <LoaderList />;

    return (
        <>
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight pb-4">{title}</h2>
            </div>
            <div className="flex items-center mb-4 justify-between">
                <div className="flex items-center gap-4">
                    <Link to="/dashboard/customers/new">
                        <Button>New Customer</Button>
                    </Link>
                    <Select onValueChange={handleChangeDirection}>
                        <SelectTrigger className="w-20">
                            <SelectValue placeholder={direction} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="asc">asc</SelectItem>
                            <SelectItem value="desc">desc</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center gap-4">
                    <PageSize handleChangePageSize={handleChangePageSize} />
                    <form
                        className="flex max-w-sm items-center space-x-2"
                        onSubmit={searchForm.handleSubmit(onSubmitSearch)}
                    >
                        <Input
                            type="text"
                            name="search"
                            placeholder="Search By Name.."
                            {...searchForm.register("search")}
                            autoComplete="off"
                        />
                        <Button type="submit">
                            <Search />
                        </Button>
                    </form>
                </div>
            </div>
            <CustomersList data={data?.data} deleteItem={deleteItem} />
            <PaginationComponent paging={paging} searchParams={searchParams} setSearchParams={setSearchParams} />
        </>
    );
};

CustomersIndex.propTypes = {
    title: PropTypes.string,
};

DataList.propTypes = {
    title: PropTypes.string,
};

export default CustomersIndex;

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useBillsService from "@/services/useBillsService";
import LoaderList from "@/shared/LoaderList";
import PageSize from "@/shared/PageSize";
import PaginationComponent from "@/shared/PaginationComponent";
import { QueryClient, QueryClientProvider, keepPreviousData, useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import BillsList from "./BillsList";

const queryClient = new QueryClient();
const BillsIndex = ({ title }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <DataList title={title} />
        </QueryClientProvider>
    );
};

const DataList = ({ title }) => {
    const { getAll } = useBillsService();
    const [searchParams, setSearchParams] = useSearchParams();
    const daily = searchParams.get("daily") || null;
    const weekStart = searchParams.get("weekStart") || null;
    const weekEnd = searchParams.get("weekEnd") || null;
    const monthly = searchParams.get("monthly") || null;
    const direction = searchParams.get("direction") || "asc";
    const sortBy = searchParams.get("sortBy") || "transDate";
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
        queryKey: ["bills", daily, weekStart, weekEnd, monthly, direction, sortBy, page, size],
        queryFn: async () => {
            return await getAll({
                daily: daily,
                weekStart: weekStart,
                weekEnd: weekEnd,
                monthly: monthly,
                direction: direction,
                sortBy: sortBy,
                page: page,
                size: size,
            });
        },
        placeholderData: keepPreviousData,
        staleTime: 5000,
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
                    <Link to="/dashboard/bills/new">
                        <Button>New Transaction</Button>
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
                </div>
            </div>
            <BillsList data={data?.data} />
            <PaginationComponent paging={paging} searchParams={searchParams} setSearchParams={setSearchParams} />
        </>
    );
};

BillsIndex.propTypes = {
    title: PropTypes.string,
};

DataList.propTypes = {
    title: PropTypes.string,
};

export default BillsIndex;

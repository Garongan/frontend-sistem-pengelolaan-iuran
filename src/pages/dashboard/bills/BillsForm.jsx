import { Button } from "@/components/ui/button";
import useMenuService from "@/services/useMenuService";
import { priceFormat } from "@/shared/usePriceFormat";
import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const BillsForm = ({ title }) => {
    const [orders, setOrders] = useState([]);
    const menuService = useMenuService();
    const [searchParams, setSearchParams] = useSearchParams();
    const size = searchParams.get("size") || "";
    const menus = useQuery({
        queryKey: ["menus"],
        queryFn: async () => {
            return await menuService.getAll({ size: size });
        },
    });

    const handleMinusOrder = () => {

    }

    const handlePlusOrder = () => {
        
    }

    useEffect(() => {
        if (menus.isSuccess) {
            menus.data?.data.forEach((menu) => {
                setOrders((prev) => [...prev, { name: menu.name, price: menu.price, qty: 0 }]);
            });
            setSearchParams({ size: menus.data?.paginationResponse.totalElement });
        }
    }, [menus.data?.data]);

    return (
        <>
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight pb-4">{title}</h2>
            </div>

            <div className="flex flex-wrap">
                {menus.data?.data.map((menu) => {
                    return (
                        <div key={menu.id} className="w-1/4 p-4">
                            <img
                                className="h-32 w-60 object-cover rounded-xl"
                                src={menu.imageResponse.url}
                                alt={menu.imageResponse.name}
                            />
                            <div className="font-xl font-medium py-2">{menu.name}</div>
                            <p>{priceFormat(menu.price)}</p>
                            <div className="flex gap-4 py-2 items-center">
                                <Button>-</Button>
                                {orders.map((order) => menu.name === order.name && (
                                    <div key={order.name}>
                                        <p>{order.qty}</p>
                                    </div>
                                ))}
                                <Button>+</Button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

BillsForm.propTypes = {
    title: PropTypes.string,
};

export default BillsForm;

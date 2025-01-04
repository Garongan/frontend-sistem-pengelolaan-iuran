import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import useMenuService from "@/services/useMenuService";
import { priceFormat } from "@/shared/usePriceFormat";
import { TicketCheck } from "lucide-react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BillsList = ({ data }) => {
    const { getById } = useMenuService();
    const [menus, setMenus] = useState([]);
    let total = 0;

    const removeDuplicates = (arr) => {
        return arr.filter((item, index) => {
            return arr.findIndex((t) => t.billdetailId === item.billdetailId) === index;
        });
    };

    const openDetails = (item) => {
        return (
            <>
                {removeDuplicates(menus).map((menu, index) => {
                    total += menu.subTotal;
                    return (
                        item.id === menu.id && (
                            <div key={index} className="flex flex-col gap-2 w-full justify-end">
                                <img src={menu.menu.imageResponse.url} alt="menu-image" />
                                <span>Order: {menu.menu.name}</span>
                                <Separator />
                                <div className="flex flex-col justify-end gap-2 pb-2">
                                    <span>
                                        {menu.qty} x {priceFormat(menu.price)}
                                    </span>
                                    <span>Sub Total: {priceFormat(menu.subTotal)}</span>
                                </div>
                            </div>
                        )
                    );
                })}
                <Separator />
                <span className="font-bold text-zinc-900">Grand Total: {priceFormat(total)}</span>
            </>
        );
    };

    useEffect(() => {
        const fetchData = async (itemId, billdetailId, qty, price, menuId) => {
            const response = await getById(menuId);
            setMenus((prev) => [
                ...prev,
                {
                    id: itemId,
                    billdetailId: billdetailId,
                    qty: qty,
                    price: price,
                    menu: response.data,
                    subTotal: qty * price,
                },
            ]);
        };
        data.map((item) => {
            item.billdetails.map((detail) => {
                fetchData(item.id, detail.id, detail.qty, detail.price, detail.menuId);
            });
        });
    }, [data]);

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50px]">No</TableHead>
                        <TableHead>Transaction Date</TableHead>
                        <TableHead>Customer Name</TableHead>
                        <TableHead>Table Name</TableHead>
                        <TableHead>Transaction Type</TableHead>
                        <TableHead>Transaction Status</TableHead>
                        <TableHead className="text-right">Payment Link</TableHead>
                        <TableHead className="text-right">Detail</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                                {new Intl.DateTimeFormat("id-ID", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "numeric",
                                    second: "numeric",
                                    timeZoneName: "short",
                                }).format(new Date(item.transDate))}
                            </TableCell>
                            <TableCell>{item.customerName}</TableCell>
                            <TableCell>{item.tableName}</TableCell>
                            <TableCell>{item.transType}</TableCell>
                            <TableCell>
                                <div
                                    className={`font-bold px-1 rounded-md w-fit 
                                    ${item.payment.transactionStatus === "settlement" && "bg-green-600 text-zinc-50"}
                                    ${item.payment.transactionStatus === "returned" && "bg-red-600 text-zinc-50"}
                                    ${item.payment.transactionStatus === "pending" && "bg-zinc-400 text-zinc-50"}
                                    ${item.payment.transactionStatus === "ordered" && "bg-sky-400 text-zinc-50"}
                                    `}
                                >
                                    {item.payment.transactionStatus}
                                </div>
                            </TableCell>
                            <TableCell className="text-right">
                                <Link to={item.payment.redirectUrl}>
                                    <Button><TicketCheck className="mr-2 h-4 w-4"/>Open Link</Button>
                                </Link>
                            </TableCell>
                            <TableCell className="text-right">
                                <Sheet>
                                    <Button asChild>
                                        <SheetTrigger>Open Details</SheetTrigger>
                                    </Button>
                                    <SheetContent>
                                        <SheetHeader>
                                            <SheetTitle>Transaction Details</SheetTitle>
                                            {openDetails(item)}
                                        </SheetHeader>
                                    </SheetContent>
                                </Sheet>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
};

BillsList.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
};

export default BillsList;

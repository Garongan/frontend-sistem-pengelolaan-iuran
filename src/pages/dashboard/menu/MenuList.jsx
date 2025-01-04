import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";

import { Skeleton } from "@/components/ui/skeleton";
import PropTypes from "prop-types";
import ActionList from "../components/ActionList";
import { priceFormat } from "@/shared/usePriceFormat";

const MenuList = ({ data, deleteItem }) => {
    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50px]">No</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Image</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>
                                {priceFormat(item.price)}
                            </TableCell>
                            <TableCell>
                                {item.imageResponse ? (
                                    <img
                                        src={item.imageResponse.url}
                                        alt={item.name}
                                        className="h-32 w-60 object-cover rounded-xl"
                                    />
                                ) : (
                                    <Skeleton className="h-32 w-60 rounded-xl" />
                                )}
                            </TableCell>
                            <TableCell className="text-right">
                                <ActionList
                                    id={item.id}
                                    deleteItem={deleteItem}
                                    fromWhat="menu"
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
};

MenuList.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    deleteItem: PropTypes.object,
};

export default MenuList;

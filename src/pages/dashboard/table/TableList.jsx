import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";

import PropTypes from "prop-types";
import ActionList from "../components/ActionList";

const TableList = ({ data, deleteItem }) => {
    return (
        <Table className="rounded-md">
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[50px]">No</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data?.map((item, index) => (
                    <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell className="text-right">
                            <ActionList id={item.id} deleteItem={deleteItem} fromWhat="table" />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

TableList.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    deleteItem: PropTypes.object,
};

export default TableList;

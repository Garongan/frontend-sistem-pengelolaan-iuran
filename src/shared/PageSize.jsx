import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PropTypes from "prop-types";
import { useState } from "react";

const PageSize = ({ handleChangePageSize }) => {
    const [position, setPosition] = useState("10");

    const changePageSize = (size) => {
        setPosition(size);
        handleChangePageSize(size);
    };
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">{position}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>List Size</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={position} onValueChange={changePageSize}>
                    <DropdownMenuRadioItem value="10">10</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="50">50</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="100">100</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

PageSize.propTypes = {
    handleChangePageSize: PropTypes.func,
};

export default PageSize;

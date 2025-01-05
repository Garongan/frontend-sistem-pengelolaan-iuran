import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { DollarSign } from "lucide-react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

const PriceFilter = ({ handlePriceFilter }) => {
    const { register, handleSubmit } = useForm({ defaultValues: { min: "", max: "" } });
    const onSubmit = (data) => {
        const { min, max } = data;
        if (min === "" && max === "") {
            return;
        } else if (min !== "") {
            handlePriceFilter(parseInt(min), max);
        } else if (max !== "") {
            handlePriceFilter(min, parseInt(max));
        }
    };
    return (
        <form className="flex items-center space-x-4 w-96" onSubmit={handleSubmit(onSubmit)}>
            <Input name="minPrice" placeholder="Min..." {...register("min")} />
            <Separator className="w-1/12" />
            <Input name="maxPrice" placeholder="Max..." {...register("max")} />
            <Button type="submit">
                <DollarSign className="mr-2 h-4 w-4" />
                Filter
            </Button>
        </form>
    );
};

PriceFilter.propTypes = {
    handlePriceFilter: PropTypes.func,
};

export default PriceFilter;

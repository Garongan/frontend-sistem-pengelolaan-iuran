import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import useCustomersService from "@/services/useCustomersService";
import { zodResolver } from "@hookform/resolvers/zod";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Nama harus lebih dari 2 karakter.",
    }),
    phone: z.string().optional(),
});

const CustomersForm = ({ title }) => {
    const { create, getById, updateById } = useCustomersService();
    const navigate = useNavigate();
    const { id } = useParams();

    const form = useForm({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            phone: "",
        },
    });

    const onSubmit = async (data) => {
        const id = form.getValues("id");
        if (id) {
            try {
                data = { id: id, ...data };
                const response = await updateById(id, data);
                if (response && response.statusCode === 200) {
                    navigate("/dashboard/customers");
                }
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: "Upsss! Terdapat Kesalahan Server.",
                    description: error.message,
                });
            }
        } else {
            try {
                const response = await create(data);
                if (response && response.statusCode === 201) {
                    navigate("/dashboard/customers");
                }
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: "Upsss! Terdapat Kesalahan Server.",
                    description: error.message,
                });
            }
        }
    };

    useEffect(() => {
        const fetch = async () => {
            const data = await getById(id);
            form.setValue("id", data?.data.id);
            form.setValue("name", data?.data.name);
            if (data?.data.phoneNumber === null) form.setValue("phone", "");
            else form.setValue("phone", data?.data.phoneNumber);
            form.trigger();
        };
        fetch();
    }, [id, form.setValue]);

    return (
        <>
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight pb-4">{title}</h2>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" autoComplete="off">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Customer Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Customer Name..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="089..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </>
    );
};

CustomersForm.propTypes = {
    title: PropTypes.string,
};

export default CustomersForm;

import { z } from "zod";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useNavigate } from "react-router-dom";
import useAuthService from "@/services/useAuthService";
import PropTypes from "prop-types";
import { toast } from "@/components/ui/use-toast";

const schema = z.object({
    name: z.string().min(4, {
        message: "Name is required",
    }),
    phone: z.string().min(10).max(13, {
        message: "Phone number is required",
    }),
    username: z.string().min(4, {
        message: "Username is required",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters",
    }),
});

const RegistrationForm = ({ isAdmin }) => {
    const navigate = useNavigate();
    const service = useAuthService();

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            phone: "",
            username: "",
            password: "",
        },
        mode: "onChange",
    });

    const onSubmit = async (data) => {
        try {
            if (isAdmin) {
                const response = await service.registerAdmin(data);
                if (response && response.statusCode === 201) {
                    localStorage.removeItem("user");
                    navigate("/login");
                }
            } else {
                const response = await service.registerUser(data);
                if (response && response.statusCode === 201) {
                    navigate("/login");
                }
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Upsss! Terdapat Kesalahan Register.",
                description: error.message,
            });
        }
    };
    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4" autoComplete="off">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Input name here..." {...field} />
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
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                    <Input text="text" placeholder="Input phone here.." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Input username here..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Input password here..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full my-2" disabled={!form.formState.isValid}>
                        Submit
                    </Button>
                </form>
            </Form>
        </>
    );
};

RegistrationForm.propTypes = {
    isAdmin: PropTypes.bool,
};

export default RegistrationForm;

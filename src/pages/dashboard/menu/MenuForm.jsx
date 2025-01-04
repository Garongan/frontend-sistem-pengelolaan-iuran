import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";
import useMenuService from "@/services/useMenuService";
import { zodResolver } from "@hookform/resolvers/zod";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

const createSchema = z.object({
    name: z.string().min(2, {
        message: "Nama harus lebih dari 2 karakter.",
    }),
    price: z
        .string()
        .refine((val) => !isNaN(parseFloat(val)), "harga harus berupa angka")
        .transform((val) => parseInt(val))
        .refine((val) => val >= 0, "harga harus lebih dari 0"),
    image: z
        .any()
        .refine(
            (files) =>
                files.length !== 0 && ["image/png", "image/jpg", "image/jpeg", "image/svg+xml"].includes(files[0].type),
            "format gambar tidak sesuai"
        ),
});

const updateSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "name wajib di isi!"),
    price: z
        .string()
        .refine((val) => !isNaN(parseFloat(val)), "harga harus berupa angka")
        .transform((val) => parseInt(val))
        .refine((val) => val >= 0, "harga harus lebih dari 0"),
    image: z
        .any()
        .optional()
        .refine((files) => {
            if (files.length === 0) return true;
            return ["image/png", "imgae/jpg", "image/jpeg", "image/svg+xml"].includes(files[0].type);
        }, "format gambar tidak sesuai"),
});

const MenuForm = ({ title }) => {
    const { create, getById, updateById } = useMenuService();
    const navigate = useNavigate();
    const { id } = useParams();
    const [previewImage, setPreviewImage] = useState("");

    function handleImageChange(event) {
        const { files } = event.target;
        const displayUrl = URL.createObjectURL(event.target.files[0]);

        return { files, displayUrl };
    }

    const form = useForm({
        resolver: zodResolver(id ? updateSchema : createSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            price: "",
            image: "",
        },
    });

    const onSubmit = async (data) => {
        const id = form.getValues("id");
        if (id) {
            try {
                const formData = new FormData();
                const updatedData = {
                    id: id,
                    name: data.name,
                    price: data.price,
                };
                formData.append("menu", JSON.stringify(updatedData));
                if (data.image[0]) {
                    formData.append("image", data.image[0]);
                }
                const response = await updateById(id, formData);
                if (response && response.statusCode === 200) {
                    navigate("/dashboard/menu");
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
                const formData = new FormData();
                const newData = {
                    name: data.name,
                    price: data.price,
                };
                formData.append("menu", JSON.stringify(newData));
                formData.append("image", data.image[0]);
                const response = await create(formData);
                if (response && response.statusCode === 201) {
                    navigate("/dashboard/menu");
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
            form.setValue("price", data?.data.price.toString());
            setPreviewImage(data?.data.imageResponse.url);
            form.trigger();
        };
        fetch();
    }, [id, form.setValue, form.trigger]);

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
                                <FormLabel>Menu Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Menu Baru..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Harga Menu</FormLabel>
                                <FormControl>
                                    <Input placeholder="Harga Menu Baru..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {previewImage == "" ? (
                        <Skeleton className="h-32 w-60 rounded-xl" />
                    ) : (
                        <img src={previewImage} alt="preview" className="h-32 w-60 object-cover rounded-xl" />
                    )}
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field: { value, onChange, ...rest } }) => (
                            <FormItem>
                                <FormLabel>Upload Gambar Menu</FormLabel>
                                <FormControl>
                                    <Input
                                        {...rest}
                                        type="file"
                                        accept="image/png, image/jpg, image/jpeg, image/svg+xml"
                                        onChange={(event) => {
                                            const { files, displayUrl } = handleImageChange(event);
                                            setPreviewImage(displayUrl);
                                            onChange(files);
                                        }}
                                    />
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

MenuForm.propTypes = {
    title: PropTypes.string,
};

export default MenuForm;

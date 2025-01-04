import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import useResidentService from '@/services/useResidentService';
import { zodResolver } from '@hookform/resolvers/zod';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

const formSchema = z.object({
  fullname: z
    .string()
    .min(1, { message: 'Nama lengkap wajib diisi' })
    .max(100, { message: 'Nama lengkap maksimal 100 karakter' }),
  is_permanent_resident: z.string({
    required_error: 'Status penghuni tetap wajib diisi',
  }),
  phone_number: z
    .string()
    .regex(/^\d+$/, { message: 'Nomor telepon hanya boleh berisi angka' })
    .min(10, { message: 'Nomor telepon minimal 10 digit' })
    .max(15, { message: 'Nomor telepon maksimal 15 digit' }),
  is_married: z.string({
    required_error: 'Status pernikahan wajib diisi',
  }),
  identity_card_image: z
    .any()
    .refine((file) => file?.[0]?.size <= 2 * 1024 * 1024, {
      message: 'Ukuran file KTP maksimal 2MB',
    })
    .refine((file) => ['image/jpeg', 'image/png'].includes(file?.[0]?.type), {
      message: 'Gambar KTP harus berupa JPG atau PNG',
    }),
});

const ResidentForm = ({ title }) => {
  const { create, getById, updateById } = useResidentService();
  const [preview, setPreview] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      fullname: '',
      is_permanent_resident: '',
      phone_number: '',
      is_married: '',
      identity_card_image: undefined,
    },
  });

  function getImageData(event) {
    const dataTransfer = new DataTransfer();

    Array.from(event.target.files).forEach((image) =>
      dataTransfer.items.add(image)
    );

    const files = dataTransfer.files;
    const displayUrl = URL.createObjectURL(event.target.files[0]);

    return { files, displayUrl };
  }

  const onSubmit = async (data) => {
    const formdata = new FormData();
    const id = form.getValues('id');
    if (id) {
      try {
        data = { id: id, name: data.name.toUpperCase() };
        const response = await updateById(id, data);
        if (response && response.statusCode === 200) {
          navigate('/dashboard/resident');
        }
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Upsss! Terdapat Kesalahan Server.',
          description: error.message,
        });
      }
    } else {
      formdata.append(
        'data',
        JSON.stringify({
          fullname: data.fullname,
          is_permanent_resident:
            data.is_permanent_resident === 'Kontrak' ? false : true,
          phone_number: data.phone_number,
          is_married: data.is_married === 'Belum Menikah' ? false : true,
        })
      );
      formdata.append('identity_card_image', data.identity_card_image[0]);
      try {
        const response = await create(formdata);
        if (response && response.statusCode === 201) {
          navigate('/dashboard/resident');
        }
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Upsss! Terdapat Kesalahan Server.',
          description: error.message,
        });
      }
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const data = await getById(id);
      form.setValue('id', data?.data.id);
      form.setValue('name', data?.data.name);
      form.trigger();
    };
    fetch();
  }, [id, form.setValue, getById, form]);

  return (
    <>
      <div className='flex items-center justify-between space-y-2'>
        <h2 className='text-3xl font-bold tracking-tight pb-4'>{title}</h2>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8'
          autoComplete='off'
        >
          <FormField
            control={form.control}
            name='fullname'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Penghuni</FormLabel>
                <FormControl>
                  <Input placeholder='Santoso...' {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription>Masukkan nama sesuai KTP</FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='is_permanent_resident'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Pilih status penghuni' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='Kontrak'>Kontrak</SelectItem>
                    <SelectItem value='Tetap'>Tetap</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Status penghuni rumah</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='phone_number'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nomor Telepon Penghuni</FormLabel>
                <FormControl>
                  <Input placeholder='0851...' {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  Masukkan nomor telepon yang dapat dihubungi
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='is_married'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status Pernikahan</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Pilih status pernikahan' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='Belum Menikah'>Belum Menikah</SelectItem>
                    <SelectItem value='Sudah Menikah'>Sudah Menikah</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Masukkan status pernikahan sesuai KTP
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {preview !== '' && (
            <img className='lg:h-64 md:h-52' src={preview} alt='KTP' />
          )}
          <FormField
            control={form.control}
            name='identity_card_image'
            render={({ field: { onChange, ...rest } }) => (
              <FormItem>
                <FormLabel>Gambar KTP</FormLabel>
                <FormControl>
                  <Input
                    type='file'
                    accept='image/png, image/jpeg'
                    {...rest}
                    onChange={(event) => {
                      const { files, displayUrl } = getImageData(event);
                      setPreview(displayUrl);
                      onChange(files);
                    }}
                    value={undefined}
                  />
                </FormControl>
                <FormDescription>
                  Masukkan gambar ktp yang resmi
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    </>
  );
};

ResidentForm.propTypes = {
  title: PropTypes.string,
};

export default ResidentForm;

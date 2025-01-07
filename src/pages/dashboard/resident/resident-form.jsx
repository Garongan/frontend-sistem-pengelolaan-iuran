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
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/components/ui/use-toast';
import useResident from '@/hooks/use-resident';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

const ResidentForm = ({ title, isEditMode }) => {
  const { create, getById, updateById } = useResident();
  const [preview, setPreview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

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
    identity_card_image: isEditMode
      ? z
          .any()
          .refine((file) => file?.[0]?.size <= 2 * 1024 * 1024, {
            message: 'Ukuran file KTP maksimal 2MB',
          })
          .refine(
            (file) => ['image/jpeg', 'image/png'].includes(file?.[0]?.type),
            {
              message: 'Gambar KTP harus berupa JPG atau PNG',
            }
          )
          .optional()
      : z
          .any()
          .refine((file) => file?.[0]?.size <= 2 * 1024 * 1024, {
            message: 'Ukuran file KTP maksimal 2MB',
          })
          .refine(
            (file) => ['image/jpeg', 'image/png'].includes(file?.[0]?.type),
            {
              message: 'Gambar KTP harus berupa JPG atau PNG',
            }
          ),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      fullname: '',
      is_permanent_resident: undefined,
      phone_number: '',
      is_married: undefined,
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
    setIsLoading(true);
    if (id) {
      try {
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

        if (data.identity_card_image) {
          formdata.append('identity_card_image', data.identity_card_image[0]);
        }

        formdata.append('_method', 'PUT');

        const response = await updateById(id, formdata);
        if (response && response.statusCode === 200) {
          setIsLoading(false);
          navigate('/dashboard/resident');
        }
      } catch (error) {
        console.clear();
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
          setIsLoading(false);
          navigate('/dashboard/resident');
        }
      } catch (error) {
        console.clear();
        toast({
          variant: 'destructive',
          title: 'Upsss! Terdapat Kesalahan Server.',
          description: error.message,
        });
        setIsLoading(false);
      }
    }
  };

  const fetch = useCallback(async () => {
    try {
      const data = await getById(id);
      form.setValue('id', data?.data.id);
      form.setValue('fullname', data?.data.fullname);
      form.setValue(
        'is_permanent_resident',
        data?.data.is_permanent_resident ? 'Tetap' : 'Kontrak'
      );
      form.setValue('phone_number', data?.data.phone_number);
      form.setValue(
        'is_married',
        data?.data.is_married ? 'Sudah Menikah' : 'Belum Menikah'
      );
      setPreview(data?.data.indentity_card_url);
      form.trigger();
    } catch (error) {
      console.clear();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, id]);

  useEffect(() => {
    fetch();
  }, [fetch, form, form.getFieldState]);

  return (
    <div className='py-5'>
      <div className='flex items-center justify-between space-y-2'>
        <h2 className='text-xl md:text-3xl font-bold tracking-tight pb-4'>
          {title}
        </h2>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 px-2'
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
                  value={field.value}
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
                <FormDescription>Pilih status penghuni</FormDescription>
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
                  value={field.value}
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
                  Pilih status pernikahan sesuai KTP
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {preview === '' ? (
            <Skeleton className='lg:h-64 md:h-52 aspect-video rounded-xl' />
          ) : (
            <img
              className='lg:h-64 md:h-52 rounded-xl'
              src={preview}
              alt='KTP'
            />
          )}
          <FormField
            control={form.control}
            name='identity_card_image'
            render={({ field: { onChange, ...rest } }) => (
              <FormItem>
                <FormLabel>Gambar KTP</FormLabel>
                <FormControl>
                  <Input
                    className='cursor-pointer'
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
          <Button disabled={!form.formState.isValid} type='submit'>
            {isLoading ? <Loader2 className='animate-spin' /> : 'Submit'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

ResidentForm.propTypes = {
  title: PropTypes.string,
  isEditMode: PropTypes.bool,
};

export default ResidentForm;

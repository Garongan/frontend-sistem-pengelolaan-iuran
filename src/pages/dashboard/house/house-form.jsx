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
import useHouse from '@/hooks/use-house';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';

const HouseForm = ({ title }) => {
  const { create, getById, updateById } = useHouse();
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    house_code: z.string().min(1, {
      message: 'Kode rumah wajib diisi',
    }),
    is_occupied: z.string({
      required_error: 'Status pernikahan wajib diisi',
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      house_code: '',
      is_occupied: undefined,
    },
  });

  const onSubmit = async (data) => {
    const id = form.getValues('id');
    setIsLoading(true);
    if (id) {
      try {
        data = {
          id: id,
          ...data,
          is_occupied: data.is_occupied === 'Tidak Dihuni' ? false : true,
        };
        const response = await updateById(id, data);
        if (response && response.statusCode === 200) {
          setIsLoading(false);
          navigate('/dashboard/house');
        }
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Upsss! Terdapat Kesalahan Server.',
          description: error.message,
        });
      }
    } else {
      try {
        const response = await create({
          ...data,
          is_occupied: data.is_occupied === 'Tidak Dihuni' ? false : true,
        });
        if (response && response.statusCode === 201) {
          setIsLoading(false);
          navigate('/dashboard/house');
        }
      } catch (error) {
        console.clear();
        let message = error?.response?.data?.data;
        if (message && message.includes('Duplicate')) {
          message = 'Data rumah sudah ada';
        } else {
          message = error.message;
        }
        toast({
          variant: 'destructive',
          title: 'Upsss! Terdapat Kesalahan Server.',
          description: message,
        });
        setIsLoading(false);
      }
    }
  };

  const fetch = useCallback(async () => {
    try {
      const data = await getById(id);
      form.setValue('id', data?.data.id);
      form.setValue('house_code', data?.data.house_code);
      form.setValue(
        'is_occupied',
        data?.data.is_occupied ? 'Dihuni' : 'Tidak Dihuni'
      );
      form.trigger();
    } catch (error) {
      console.clear();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, id]);

  useEffect(() => {
    fetch();
  }, [fetch, form]);

  return (
    <>
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
            name='house_code'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kode Rumah</FormLabel>
                <FormControl>
                  <Input placeholder='Kode Rumah...' {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription>Masukkan kode rumah</FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='is_occupied'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status Rumah</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Pilih status rumah' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='Tidak Dihuni'>Tidak Dihuni</SelectItem>
                      <SelectItem value='Dihuni'>Dihuni</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
                <FormDescription>Pilih Status Rumah</FormDescription>
              </FormItem>
            )}
          />
          <Button disabled={!form.formState.isValid} type='submit'>
            {isLoading ? <Loader2 className='animate-spin' /> : 'Submit'}
          </Button>
        </form>
      </Form>
    </>
  );
};

HouseForm.propTypes = {
  title: PropTypes.string,
};

export default HouseForm;

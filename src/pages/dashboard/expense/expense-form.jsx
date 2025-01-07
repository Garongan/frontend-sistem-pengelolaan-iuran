import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import useExpense from '@/hooks/use-expense';
import { priceFormat } from '@/hooks/use-price-format';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, Loader2 } from 'lucide-react';
import PropTypes from 'prop-types';
import { useReducer, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const ExpenseForm = ({ title }) => {
  const { create } = useExpense();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useReducer((_, next) => {
    const digits = next.replace(/[^0-9]/g, '');
    return priceFormat(digits);
  }, '');
  const [dateFormOpen, setDateFormOpen] = useState(false);

  const formSchema = z.object({
    description: z.string().min(4, {
      message: 'Deskripsi pengeluaran wajib diisi atau minimal 4 karakter',
    }),
    amount: z.number({ message: 'Jumlah pengeluaran tidak valid ' }),
    date: z.date({ message: 'Tanggal tidak valid' }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      description: '',
      amount: '',
      date: null,
    },
  });

  const handleChangeAmount = (changeFn, value) => {
    const digits = value.replace(/\D/g, '');
    const realAmount = Number(digits);
    changeFn(realAmount);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await create(data);
      if (response && response.statusCode === 201) {
        setIsLoading(false);
        navigate('/dashboard/expense');
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Upsss! Terdapat Kesalahan Server.',
        description: error.message,
      });
      setIsLoading(false);
    }
  };

  return (
    <div className='py-5'>
      <div className='flex items-center justify-between space-y-2'>
        <h2 className='text-3xl font-bold tracking-tight pb-4'>{title}</h2>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 px-2'
          autoComplete='off'
        >
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deskripsi Pengeluaran</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Deskripsi pengeluaran...'
                    className='resize-none'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  Masukkan deskripsi pengeluaran
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='amount'
            render={({ field }) => {
              field.value = amount;
              const _change = field.onChange;

              return (
                <FormItem>
                  <FormLabel>Jumlah Pengeluaran</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Rp 0'
                      {...field}
                      onChange={(e) => {
                        setAmount(e.target.value);
                        handleChangeAmount(_change, e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    Masukkan deskripsi pengeluaran
                  </FormDescription>
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name='date'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tanggal Pengeluaran</FormLabel>
                <Popover open={dateFormOpen} onOpenChange={setDateFormOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pilih Tanggal</span>
                        )}
                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='single'
                      selected={field.value}
                      onSelect={(e) => {
                        field.onChange(e);
                        setDateFormOpen(false);
                      }}
                      disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>Pilih Tanggal Pengeluaran</FormDescription>
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

ExpenseForm.propTypes = {
  title: PropTypes.string,
};

export default ExpenseForm;

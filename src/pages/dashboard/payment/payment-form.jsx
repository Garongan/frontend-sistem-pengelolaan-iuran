import { z } from 'zod';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import usePayment from '@/hooks/use-payment';
import { priceFormat } from '@/hooks/use-price-format';
import useResident from '@/hooks/use-resident';
import { cn } from '@/lib/utils';
import { ResidentComboBox } from '@/shared/resident-combo-box';
import { zodResolver } from '@hookform/resolvers/zod';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { CalendarIcon, Loader2 } from 'lucide-react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const PaymentForm = ({ title }) => {
  const { create } = usePayment();
  const { getAll } = useResident();
  const navigate = useNavigate();
  const [selectedResident, setSelectedResident] = useState({
    id: null,
    name: '',
  });
  const [dateFormOpen, setDateFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    resident_id: z.string().uuid({ message: 'Id tidak valid' }),
    payment_type: z.string({
      required_error: 'Tipe pembayaran iuran wajib diisi',
    }),
    amount: z.number(),
    period: z.date({ message: 'Tanggal tidak valid' }),
    is_paid_off: z.string({
      required_error: 'Status pembayaran iuran wajib diisi',
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      resident_id: '',
      payment_type: '',
      amount: '',
      period: null,
      is_paid_off: undefined,
    },
  });

  const handleGetAll = async () => {
    const response = await getAll({
      name: selectedResident.name,
      page: 1,
      size: 8,
    });
    return response.data;
  };

  const { data } = useQuery({
    queryKey: ['houseResidents', selectedResident],
    queryFn: handleGetAll,
    placeholderData: keepPreviousData,
    staleTime: 5000,
  });

  const handleChangeAmount = () => {
    if (form.getValues('payment_type') === 'security') {
      form.setValue('amount', 100000);
    } else if (form.getValues('payment_type') === 'sanitation') {
      form.setValue('amount', 15000);
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      data = {
        ...data,
        is_paid_off: data.is_paid_off === 'Belum Lunas' ? false : true,
      };
      const response = await create(data);
      if (response && response.statusCode === 201) {
        setIsLoading(false);
        navigate('/dashboard/payment');
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

  useEffect(() => {
    form.setValue('resident_id', selectedResident.id);
  }, [form, selectedResident]);

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
          <ResidentComboBox
            dataList={data?.data}
            form={form}
            selectedResident={selectedResident}
            setSelectedResident={setSelectedResident}
          />
          <FormField
            control={form.control}
            name='payment_type'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipe Pembayaran Iuran</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(e) => {
                      field.onChange(e);
                      handleChangeAmount();
                    }}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Pilih tipe pembayaran iuran' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='sanitation'>Kebersihan</SelectItem>
                      <SelectItem value='security'>Keamanan</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
                <FormDescription>Pilih Tipe Pembayaran Iuran</FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='amount'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jumlah Pembayaran</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Rp.0'
                    {...field}
                    disabled
                    value={priceFormat(field.value)}
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  Jumlah pembayaran yang harus dibayarkan penghuni
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='period'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Periode Pembayaran</FormLabel>
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
                <FormDescription>Pilih Periode Pembayaran</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='is_paid_off'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status Pembayaran Iuran</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Pilih status pembayaran iuran' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='Belum Lunas'>Belum Lunas</SelectItem>
                      <SelectItem value='Lunas'>Lunas</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
                <FormDescription>Pilih Tipe Pembayaran Iuran</FormDescription>
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

PaymentForm.propTypes = {
  title: PropTypes.string,
};

export default PaymentForm;

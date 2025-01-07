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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { parseDate } from '@/hooks/parse-date';
import useHouse from '@/hooks/use-house';
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
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';

const HouseAddResident = ({ title }) => {
  const { addResident } = useHouse();
  const { getAll } = useResident();
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedResident, setSelectedResident] = useState({
    id: null,
    name: '',
  });
  const [dateFormOpen, setDateFormOpen] = useState(false);

  const formSchema = z.object({
    resident_id: z.string().uuid({ message: 'Id tidak valid' }),
    start_date: z.date({ message: 'Tanggal tidak valid' }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      resident_id: '',
      start_date: '',
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    data = {
      ...data,
      start_date: parseDate(data.start_date),
    };
    const response = await addResident(id, data);
    if (response && response.statusCode === 200) {
      setIsLoading(false);
      navigate('/dashboard/house');
    }
  };

  const handleGetAll = async () => {
    try {
      const response = await getAll({
        name: selectedResident.name,
        page: 1,
        size: 8,
      });
      return response.data;
    } catch (error) {
      console.clear();
    }
  };

  const { data } = useQuery({
    queryKey: ['houseResidents', selectedResident],
    queryFn: handleGetAll,
    placeholderData: keepPreviousData,
    staleTime: 5000,
  });

  useEffect(() => {
    form.setValue('resident_id', selectedResident.id);
  }, [form, selectedResident]);

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
          <ResidentComboBox
            dataList={data?.data}
            form={form}
            selectedResident={selectedResident}
            setSelectedResident={setSelectedResident}
          />
          <FormField
            control={form.control}
            name='start_date'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Tanggal Mulai</FormLabel>
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
                <FormDescription>
                  Masukkan tanggal penghuni akan memulai tinggal
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
    </>
  );
};

HouseAddResident.propTypes = {
  title: PropTypes.string,
};

export default HouseAddResident;

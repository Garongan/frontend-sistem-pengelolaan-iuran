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
import useHouse from '@/hooks/use-house';
import useResident from '@/hooks/use-resident';
import { cn } from '@/lib/utils';
import { ResidentComboBox } from '@/shared/resident-combo-box';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, Loader2 } from 'lucide-react';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
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
  const [dataResidents, setDataResidents] = useState({});

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
    const response = await addResident(id, data);
    if (response && response.statusCode === 200) {
      setIsLoading(false);
      navigate('/dashboard/house');
    }
  };

  const handleGetAll = useCallback(async () => {
    const response = await getAll({
      name: selectedResident.name,
      page: 1,
      size: 8,
    });
    setDataResidents(response.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedResident.name]);

  useEffect(() => {
    handleGetAll();
    form.setValue('resident_id', selectedResident.id);
  }, [form, handleGetAll, selectedResident]);

  return (
    <>
      <div className='flex items-center justify-between space-y-2'>
        <h2 className='text-xl md:text-3xl font-bold tracking-tight pb-4'>{title}</h2>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8'
          autoComplete='off'
        >
          <ResidentComboBox
            dataList={dataResidents?.data}
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
                          'w-full sm:w-[240px] pl-3 text-left font-normal',
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

import { Button } from '@/components/ui/button';
import { MonthPicker } from '@/components/ui/month-picker';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import usePayment from '@/hooks/use-payment';
import { cn } from '@/lib/utils';
import LoaderList from '@/shared/loader-list';
import PageSize from '@/shared/page-size';
import PaginationComponent from '@/shared/pagination-component';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { CalendarIcon, X } from 'lucide-react';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PaymentList from './payment-list';

const PaymentIndex = ({ title }) => {
  return <DataList title={title} />;
};

const DataList = ({ title }) => {
  const { getAll } = usePayment();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') || 1;
  const size = searchParams.get('size') || 8;
  const year = searchParams.get('year') || '';
  const month = searchParams.get('month') || '';
  const [paging, setPaging] = useState({
    totalPages: 0,
    totalElement: 1,
    page: page,
    size: size,
    hasNext: false,
    hasPrevious: false,
  });
  const [dateFormOpen, setDateFormOpen] = useState(false);
  const [date, setDate] = useState(null);

  const handleChangePageSize = (size) => {
    setSearchParams({
      ...searchParams,
      size: size,
    });
  };

  const handleChangePeriod = useCallback(() => {
    setDateFormOpen(false);
    setSearchParams({
      ...searchParams,
      year: date.getFullYear(),
      month: date.getMonth() + 1,
    });
  }, [date, searchParams, setSearchParams]);

  const handleDeletePeriod = () => {
    searchParams.delete('year');
    searchParams.delete('month');
    setSearchParams(searchParams);
    setDate(null);
  };

  const handleGetAll = async () => {
    let response;
    if (year === '' || month === '') {
      response = await getAll({
        page: page,
        size: size,
      });
    } else {
      response = await getAll({
        year: year,
        month: month,
        page: page,
        size: size,
      });
    }
    return response.data;
  };

  const { data, isSuccess } = useQuery({
    queryKey: ['payment', year, month, page, size],
    queryFn: handleGetAll,
    placeholderData: keepPreviousData,
    staleTime: 5000,
  });

  useEffect(() => {
    if (isSuccess) {
      setPaging({
        totalPages: data.links.length - 2,
        totalElement: data.total,
        page: data.current_page,
        size: data.per_page,
        hasNext: data.next_page_url !== null,
        hasPrevious: data.prev_page_url !== null,
      });
    }
    if (date) {
      handleChangePeriod();
    }
  }, [data, date, handleChangePeriod, isSuccess]);

  if (!isSuccess) return <LoaderList />;

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex items-center justify-between pt-2'>
        <h2 className='text-xl md:text-3xl font-bold tracking-tight'>
          {title}
        </h2>
      </div>
      <div className='flex lg:flex-row lg:items-center lg:justify-between lg:gap-0 flex-col gap-4'>
        <div className='flex items-center gap-4'>
          <Link to='/dashboard/payment/new'>
            <Button>Tambah Pembayaran Iuran Baru</Button>
          </Link>
        </div>

        <div className='flex items-center gap-4'>
          <PageSize handleChangePageSize={handleChangePageSize} />
          <Popover open={dateFormOpen} onOpenChange={setDateFormOpen}>
            <div className='flex border items-center w-full sm:w-[240px] bg-white rounded-md'>
              <PopoverTrigger
                asChild
                className='border-0 bg-transparent rounded-none'
              >
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-full font-normal outline-none',
                    !date && 'text-muted-foreground'
                  )}
                >
                  {date ? format(date, 'PPP') : <span>Periode Iuran</span>}
                  <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                </Button>
              </PopoverTrigger>
              <Button
                type='button'
                variant='ghost'
                size='icon'
                onClick={handleDeletePeriod}
              >
                <X className='h-4 w-4 opacity-50' />
              </Button>
            </div>
            <PopoverContent className='w-auto p-0' align='start'>
              <MonthPicker
                maxDate={new Date()}
                onMonthSelect={setDate}
                selectedMonth={date}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className='rounded-lg border border-zinc-200 bg-white text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50'>
        <PaymentList data={data?.data} />
      </div>
      <PaginationComponent
        paging={paging}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
    </div>
  );
};

PaymentIndex.propTypes = {
  title: PropTypes.string,
};

DataList.propTypes = {
  title: PropTypes.string,
};

export default PaymentIndex;

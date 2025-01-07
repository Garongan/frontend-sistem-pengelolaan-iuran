import { Button } from '@/components/ui/button';
import { MonthPicker } from '@/components/ui/month-picker';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { monthFormat } from '@/hooks/month-format';
import { priceFormat } from '@/hooks/price-format';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon, File, X } from 'lucide-react';
import PropTypes from 'prop-types';

export default function MonthlyReportList({
  data,
  month,
  handleDownloadReport,
  dateFormOpen,
  setDateFormOpen,
  date,
  handleDeleteDate,
  setDate,
}) {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center'>
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
                {format(date, 'PPP')}
                <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
              </Button>
            </PopoverTrigger>
            <Button
              type='button'
              variant='ghost'
              size='icon'
              onClick={handleDeleteDate}
            >
              <X className='h-4 w-4 opacity-50' />
            </Button>
          </div>
          <PopoverContent className='w-auto p-0' align='start'>
            <MonthPicker
              maxDate={new Date()}
              onMonthSelect={(e) => {
                setDate(e);
                setDateFormOpen(false);
              }}
              selectedMonth={date}
            />
          </PopoverContent>
        </Popover>
        <div className='ml-auto'>
          <Button variant='outline' onClick={handleDownloadReport}>
            <File className='mr-2 h-4 w-4' />
            Download Laporan
          </Button>
        </div>
      </div>
      <div className='rounded-lg border border-zinc-200 bg-white text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50'>
        <ListIncome data={data?.incomes} month={month} />
      </div>
      <div className='rounded-lg border border-zinc-200 bg-white text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50'>
        <ListSpending data={data?.spendings} month={month} />
      </div>
    </div>
  );
}

function ListIncome({ data, month }) {
  if (data && data.length > 0) {
    return (
      <div className='max-h-96 overflow-auto'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[50px]'>No</TableHead>
              <TableHead>Nama Lengkap</TableHead>
              <TableHead>Jumlah Iuran</TableHead>
              <TableHead>Tipe Iuran</TableHead>
              <TableHead className='min-w-40'>Tanggal Iuran</TableHead>
              <TableHead className='text-right'>Status Pembayaran</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.resident.fullname}</TableCell>
                <TableCell>{priceFormat(item.amount)}</TableCell>
                <TableCell className='font-bold'>
                  {item.payment_type.toUpperCase()}
                </TableCell>
                <TableCell>{item.period}</TableCell>
                <TableCell className='font-bold text-right'>
                  {item.is_paid_off ? 'LUNAS' : 'BELUM LUNAS'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableCaption className='pb-3'>
            Laporan pemasukan bulan{' '}
            <span className='font-bold'>{monthFormat(month)}</span>
          </TableCaption>
        </Table>
      </div>
    );
  }

  return (
    <Table className='rounded-md'>
      <TableCaption className='pb-3'>
        Laporan pemasukan bulan{' '}
        <span className='font-bold'>{monthFormat(month)}</span> kosong
      </TableCaption>
    </Table>
  );
}

function ListSpending({ data, month }) {
  if (data && data.length > 0) {
    return (
      <div className='max-h-96 overflow-auto'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[50px]'>No</TableHead>
              <TableHead>Tanggal Pengeluaran</TableHead>
              <TableHead>Deskripsi</TableHead>
              <TableHead className='text-right'>Jumlah Pengeluaran</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell className='text-right'>
                  {priceFormat(item.amount)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableCaption className='pb-3'>
            Laporan pengeluaran bulan{' '}
            <span className='font-bold'>{monthFormat(month)}</span> kosong
          </TableCaption>
        </Table>
      </div>
    );
  }

  return (
    <Table className='rounded-md'>
      <TableCaption className='pb-3'>
        Laporan pengeluaran bulan{' '}
        <span className='font-bold'>{monthFormat(month)}</span> kosong
      </TableCaption>
    </Table>
  );
}

MonthlyReportList.propTypes = {
  data: PropTypes.object,
  month: PropTypes.number,
  handleDownloadReport: PropTypes.func,
  dateFormOpen: PropTypes.bool,
  setDateFormOpen: PropTypes.func,
  date: PropTypes.object,
  handleDeleteDate: PropTypes.func,
  setDate: PropTypes.func,
};

ListIncome.propTypes = {
  data: PropTypes.array,
  month: PropTypes.number,
};

ListSpending.propTypes = {
  data: PropTypes.array,
  month: PropTypes.number,
};

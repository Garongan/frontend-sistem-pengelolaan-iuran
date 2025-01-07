import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { priceFormat } from '@/hooks/use-price-format';
import PropTypes from 'prop-types';

const ExpenseList = ({ data }) => {
  if (data && data.length > 0) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[50px]'>No</TableHead>
            <TableHead>Tanggal Pengeluaran</TableHead>
            <TableHead>Deskripsi</TableHead>
            <TableHead>Jumlah Pengeluaran</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{priceFormat(item.amount)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableCaption className='pb-3'>Daftar pengeluaran iuran</TableCaption>
      </Table>
    );
  }

  return (
    <Table className='rounded-md'>
      <TableCaption className='pb-3'>
        Daftar pengeluaran iuran kosong
      </TableCaption>
    </Table>
  );
};

ExpenseList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

export default ExpenseList;

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

const PaymentList = ({ data }) => {
  if (data && data.length > 0) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[50px]'>No</TableHead>
            <TableHead>Nama Lengkap</TableHead>
            <TableHead>Nomor Telepon</TableHead>
            <TableHead>Jumlah Iuran</TableHead>
            <TableHead>Tipe Iuran</TableHead>
            <TableHead className='min-w-40'>Tanggal Iuran</TableHead>
            <TableHead>Status Pembayaran</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.resident.fullname}</TableCell>
              <TableCell>{item.resident.phone_number}</TableCell>
              <TableCell>{priceFormat(item.amount)}</TableCell>
              <TableCell className='font-bold'>
                {item.payment_type.toUpperCase()}
              </TableCell>
              <TableCell>{item.period}</TableCell>
              <TableCell className='font-bold'>
                {item.is_paid_off ? 'LUNAS' : 'BELUM LUNAS'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableCaption className='pb-3'>Daftar pembayaran iuran</TableCaption>
      </Table>
    );
  }

  return (
    <Table className='rounded-md'>
      <TableCaption className='pb-3'>Daftar pembayaran iuran kosong</TableCaption>
    </Table>
  );
};

PaymentList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  deleteItem: PropTypes.object,
};

export default PaymentList;

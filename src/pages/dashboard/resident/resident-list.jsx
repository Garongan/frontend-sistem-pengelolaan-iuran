import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Skeleton } from '@/components/ui/skeleton';
import PropTypes from 'prop-types';
import ActionList from '../components/ActionList';

const ResidentList = ({ data, deleteItem }) => {
  if (data && data.length > 0) {
    return (
      <Table className='rounded-md'>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[50px]'>No</TableHead>
            <TableHead>Nama Lengkap</TableHead>
            <TableHead>Foto KTP</TableHead>
            <TableHead>Status Penghuni</TableHead>
            <TableHead>Nomor Telepon</TableHead>
            <TableHead>Status Pernikahan</TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.fullname}</TableCell>
              <TableCell>
                {item.indentity_card_url ? (
                  <img
                    src={item.indentity_card_url}
                    alt={`foto ktp ${item.fullname}`}
                    className='h-32 w-60 object-cover rounded-xl'
                  />
                ) : (
                  <Skeleton className='h-32 w-60 rounded-xl' />
                )}
              </TableCell>
              <TableCell>
                {item.is_permanent_resident ? 'Tetap' : 'Kontrak'}
              </TableCell>
              <TableCell>{item.phone_number}</TableCell>
              <TableCell>
                {item.is_married ? 'Belum Menikah' : 'Sudah Menikah'}
              </TableCell>
              <TableCell className='text-right'>
                <ActionList
                  id={item.id}
                  deleteItem={deleteItem}
                  fromWhat='resident'
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableCaption className='pb-3'>Daftar penghuni</TableCaption>
      </Table>
    );
  }

  return (
    <Table className='rounded-md'>
      <TableCaption className='pb-3'>Daftar penghuni kosong</TableCaption>
    </Table>
  );
};

ResidentList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  deleteItem: PropTypes.object,
};

export default ResidentList;

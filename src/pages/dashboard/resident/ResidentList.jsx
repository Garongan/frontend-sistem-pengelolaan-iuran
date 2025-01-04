import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

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
                <img
                  src={item.indentity_card_url}
                  alt={`foto ktp ${item.fullname}`}
                  className='lg:max-w-52 md:max-w-32 max-w-12'
                />
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
      </Table>
    );
  }

  return (
    <Table className='rounded-md'>
      <TableCaption>Daftar penghuni kosong</TableCaption>
    </Table>
  );
};

ResidentList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  deleteItem: PropTypes.object,
};

export default ResidentList;

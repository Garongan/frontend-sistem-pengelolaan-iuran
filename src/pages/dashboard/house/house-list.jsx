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

const HouseList = ({ data, deleteItem }) => {
  if (data && data.length > 0) {
    return (
      <>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[50px]'>No</TableHead>
              <TableHead>Kode Rumah</TableHead>
              <TableHead>Status Hunian</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.house_code}</TableCell>
                <TableCell>{item.is_occupied ? 'Dihuni' : 'Tidak Dihuni'}</TableCell>
                <TableCell className='text-right'>
                  <ActionList
                    id={item.id}
                    deleteItem={deleteItem}
                    fromWhat='house'
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableCaption className='pb-3'>Daftar rumah</TableCaption>
        </Table>
      </>
    );
  }

  return (
    <Table className='rounded-md'>
      <TableCaption className='pb-3'>Daftar rumah kosong</TableCaption>
    </Table>
  );
};

HouseList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  deleteItem: PropTypes.object,
};

export default HouseList;

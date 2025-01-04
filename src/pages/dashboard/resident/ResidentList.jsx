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
            <TableHead>Name</TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell className='text-right'>
                <ActionList
                  id={item.id}
                  deleteItem={deleteItem}
                  fromWhat='table'
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

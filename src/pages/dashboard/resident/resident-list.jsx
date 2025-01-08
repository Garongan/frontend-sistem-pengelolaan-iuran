import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { DialogTitle, DialogTrigger } from '@radix-ui/react-dialog';
import PropTypes from 'prop-types';
import ActionList from '../components/action-list';

const ResidentList = ({ data, deleteItem }) => {
  if (data && data.length > 0) {
    return (
      <Table className='rounded-md'>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[50px]'>No</TableHead>
            <TableHead>Nama Lengkap</TableHead>
            <TableHead className='sm:min-w-60 min-w-32'>Foto KTP</TableHead>
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
                  <Dialog>
                    <DialogTrigger>
                      <img
                        src={item.indentity_card_url}
                        alt={`foto ktp ${item.fullname}`}
                        className='sm:h-32 sm:w-60  w-full h-full object-cover rounded-xl'
                      />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Foto KTP</DialogTitle>
                        <DialogDescription>
                          <img
                            src={item.indentity_card_url}
                            alt={`foto ktp ${item.fullname}`}
                            className='object-cover rounded-xl'
                          />
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
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
                <div className='flex justify-end'>
                  <ActionList
                    id={item.id}
                    deleteItem={deleteItem}
                    fromWhat='resident'
                    canDelete={true}
                  />
                </div>
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

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import useHouse from '@/hooks/use-house';
import { Trash2 } from 'lucide-react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const HouseListResident = ({ title }) => {
  const location = useLocation();
  const { data, house_code } = location.state || {};
  const [residents, setResidents] = useState(data);
  const { deleteResident } = useHouse();
  const { id } = useParams();

  const onDelete = async (residentId) => {
    const data = {
      resident_id: residentId,
    };
    try {
      const response = await deleteResident(id, data);
      if (response && response.statusCode === 200) {
        setResidents(
          residents.filter((value) => value.resident_id !== residentId)
        );
      }
    } catch (error) {
      console.clear();
    }
  };

  const houseResidentList = () => {
    return (
      <>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[50px]'>No</TableHead>
              <TableHead>Kode Rumah</TableHead>
              <TableHead>Nama Penghuni</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {residents.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{house_code}</TableCell>
                <TableCell>{item.resident.fullname}</TableCell>
                <TableCell className='text-right'>
                  <AlertDialog>
                    <AlertDialogTrigger className='bg-zinc-900 text-zinc-50 inline-flex items-center justify-center rounded-md h-10 px-4 py-2'>
                      <Trash2 className='mr-2 h-4 w-4' /> Delete
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Apakah Anda Yakin Ingin Menghapus Data Ini?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Data yang sudah dihapus tidak dapat dikembalikan.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => onDelete(item.resident_id)}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableCaption className='pb-3'>Daftar rumah</TableCaption>
        </Table>
      </>
    );
  };

  return (
    <>
      <div className='flex items-center justify-between space-y-2'>
        <h2 className='text-xl md:text-3xl font-bold tracking-tight pb-4'>
          {title} {house_code}
        </h2>
      </div>
      {data && data.length > 0 ? (
        houseResidentList()
      ) : (
        <Table className='rounded-md'>
          <TableCaption className='pb-3'>
            Daftar penghuni rumah kosong
          </TableCaption>
        </Table>
      )}
    </>
  );
};

HouseListResident.propTypes = {
  title: PropTypes.string,
};

export default HouseListResident;

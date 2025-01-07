import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  DropdownMenuGroup,
  DropdownMenuItem,
} from '@radix-ui/react-dropdown-menu';
import { Trash, UserPlus } from 'lucide-react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import ActionList from '../components/action-list';

const HouseList = ({ data }) => {
  const navigate = useNavigate();

  const addResident = (id) => {
    navigate(`add-resident/${id}`);
  };

  const deleteResident = (id, data) => {
    navigate(`list-resident/${id}`, {
      state: {
        house_code: data.house_code,
        data: data.data,
      },
    });
  };

  if (data && data.length > 0) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[50px]'>No</TableHead>
            <TableHead>Kode Rumah</TableHead>
            <TableHead>Status Hunian</TableHead>
            <TableHead>Daftar Penghuni</TableHead>
            <TableHead>Tanggal Mulai Menghuni</TableHead>
            <TableHead>Tanggal Berakhir Menghuni</TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.house_code}</TableCell>
              <TableCell>
                {item.is_occupied ? 'Dihuni' : 'Tidak Dihuni'}
              </TableCell>
              <TableCell>
                {item.current_resident.length > 0 ? (
                  <ol className='list-decimal list-inside'>
                    {item.current_resident.map((value) => (
                      <li key={value.id}>{value.resident.fullname}</li>
                    ))}
                  </ol>
                ) : (
                  'Tidak ada penghuni'
                )}
              </TableCell>
              <TableCell>
                {item.current_resident.length > 0 ? (
                  <ol>
                    {item.current_resident.map((value) => (
                      <li key={value.id}>{value.start_date}</li>
                    ))}
                  </ol>
                ) : (
                  'Kosong'
                )}
              </TableCell>
              <TableCell>
                {item.current_resident.length > 0 ? (
                  <ol>
                    {item.current_resident.map((value) => (
                      <li key={value.id}>
                        {value.end_date ? value.end_date : 'Masih Menghuni'}
                      </li>
                    ))}
                  </ol>
                ) : (
                  'Kosong'
                )}
              </TableCell>
              <TableCell className='text-right'>
                <div className='flex justify-end gap-4'>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='outline'>Kontrol Penghuni</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='w-56' align='end'>
                      <DropdownMenuGroup align='end' className='space-y-2'>
                        <DropdownMenuItem
                          onClick={() => addResident(item.id)}
                          className='flex items-center p-2 cursor-pointer hover:bg-zinc-100'
                        >
                          <UserPlus className='mr-2 h-4 w-4' /> Tambah Penghuni
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          disabled={
                            item.current_resident.length > 0 ? true : false
                          }
                          onClick={() =>
                            deleteResident(item.id, {
                              house_code: item.house_code,
                              data: item.current_resident,
                            })
                          }
                          className='flex items-center p-2 cursor-pointer hover:bg-zinc-100'
                        >
                          <Trash className='mr-2 h-4 w-4' /> Hapus Penghuni
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <ActionList id={item.id} fromWhat='house' />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableCaption className='pb-3'>Daftar rumah</TableCaption>
      </Table>
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
};

export default HouseList;

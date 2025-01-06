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

import { Button } from '@/components/ui/button';
import { FilePenLine, Trash2 } from 'lucide-react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const ActionList = ({ deleteItem, id, fromWhat, canDelete }) => {
  const navigate = useNavigate();

  const handleUpdate = () => {
    navigate(`/dashboard/${fromWhat}/update/${id}`);
  };

  return (
    <>
      <div
        className={`max-w-52 grid ${canDelete && 'min-w-48 grid-cols-2 gap-4'}`}
      >
        <Button variant='outline' onClick={handleUpdate}>
          <FilePenLine className='mr-2 h-4 w-4' /> Edit
        </Button>
        {canDelete && (
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
                  onClick={() => {
                    deleteItem.mutate(id);
                  }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </>
  );
};

ActionList.propTypes = {
  id: PropTypes.string,
  deleteItem: PropTypes.object,
  fromWhat: PropTypes.string,
  canDelete: PropTypes.bool,
};

export default ActionList;

import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import useResidentService from '@/services/useResidentService';
import LoaderList from '@/shared/LoaderList';
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ResidentList from './ResidentList';

const queryClient = new QueryClient();

const ResidentIndex = ({ title }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <DataList title={title} />
    </QueryClientProvider>
  );
};

const DataList = ({ title }) => {
  const queryClient = useQueryClient();
  const { getAll, deleteById } = useResidentService();

  const handleGetAll = async () => {
    const response = await getAll();
    return response.data;
  };

  const { data, isSuccess } = useQuery({
    queryKey: ['residents'],
    queryFn: handleGetAll,
  });

  const deleteItem = useMutation({
    mutationFn: deleteById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['residents'] });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Upsss! Terdapat Kesalahan Server.',
        description: error.message,
      });
    },
  });

  if (!isSuccess) return <LoaderList />;

  return (
    <>
      <div className='flex md:flex-row flex-col md:items-center items-start justify-between space-y-2'>
        <h2 className='lg:text-3xl md:text-xl text-lg font-bold tracking-tight pb-4'>
          {title}
        </h2>
        <Link to='/dashboard/resident/new' className='pb-4'>
          <Button className='mb-4'>Tambah Penghuni</Button>
        </Link>
      </div>
      <div className='rounded-lg border border-zinc-200 bg-white text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50'>
        <ResidentList data={data?.data} deleteItem={deleteItem} />
      </div>
    </>
  );
};

ResidentIndex.propTypes = {
  title: PropTypes.string,
};

DataList.propTypes = {
  title: PropTypes.string,
};

export default ResidentIndex;

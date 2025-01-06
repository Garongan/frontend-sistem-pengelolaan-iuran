import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import useHouse from '@/hooks/use-house';
import LoaderList from '@/shared/loader-list';
import PageSize from '@/shared/page-size';
import PaginationComponent from '@/shared/pagination-component';
import {
  QueryClient,
  QueryClientProvider,
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { Search, X } from 'lucide-react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useSearchParams } from 'react-router-dom';
import HouseList from './house-list';

const queryClient = new QueryClient();

const HouseIndex = ({ title }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <DataList title={title} />
    </QueryClientProvider>
  );
};

const DataList = ({ title }) => {
  const queryClient = useQueryClient();
  const { getAll, deleteById } = useHouse();
  const [searchParams, setSearchParams] = useSearchParams();
  const houseCode = searchParams.get('houseCode') || '';
  const page = searchParams.get('page') || 1;
  const size = searchParams.get('size') || 8;
  const [paging, setPaging] = useState({
    totalPages: 0,
    totalElement: 1,
    page: page,
    size: size,
    hasNext: false,
    hasPrevious: false,
  });

  const searchForm = useForm({
    defaultValues: {
      search: '',
    },
  });

  const handleDeleteSearchName = () => {
    searchParams.delete('houseCode');
    setSearchParams(searchParams);
  };


  const handleGetAll = async () => {
    const response = await getAll({
      name: name,
      page: page,
      size: size,
    });
    return response.data;
  };

  const onSubmitSearch = (data) => {
    setSearchParams({
      ...searchParams,
      name: data.search,
    });
  };

  const handleChangePageSize = (size) => {
    setSearchParams({
      ...searchParams,
      size: size,
    });
  };

  const { data, isSuccess } = useQuery({
    queryKey: ['houses', houseCode, page, size],
    queryFn: handleGetAll,
    placeholderData: keepPreviousData,
    staleTime: 5000,
  });

  const deleteItem = useMutation({
    mutationFn: deleteById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['houses'] });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Upsss! Terdapat Kesalahan Server.',
        description: error.message,
      });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setPaging({
        totalPages: data.links.length - 2,
        totalElement: data.total,
        page: data.current_page,
        size: data.per_page,
        hasNext: data.links[2].active,
        hasPrevious: data.links[0].active,
      });
    }
  }, [data, isSuccess]);

  if (!isSuccess) return <LoaderList />;

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex items-center justify-between pt-2'>
        <h2 className='text-3xl font-bold tracking-tight'>{title}</h2>
      </div>
      <div className='flex items-center justify-between'>
        <Link to='/dashboard/house/new'>
          <Button>Tambah Rumah Baru</Button>
        </Link>

        <div className='flex w-full max-w-sm space-x-2 items-center'>
          <PageSize handleChangePageSize={handleChangePageSize} />
          <form
            className='flex w-full items-center space-x-2 max-w-sm'
            onSubmit={searchForm.handleSubmit(onSubmitSearch)}
          >
            <div className='relative w-full'>
              <Input
                type='text'
                name='search'
                placeholder='Cari Kode Rumah...'
                {...searchForm.register('search')}
                autoComplete='off'
              />
              <Button
                type='button'
                variant='ghost'
                size='icon'
                className='absolute right-1 top-1/2 -translate-y-1/2'
                onClick={handleDeleteSearchName}
              >
                <X />
              </Button>
            </div>
            <Button type='submit'>
              <Search />
            </Button>
          </form>
        </div>
      </div>
      <div className='rounded-lg border border-zinc-200 bg-white text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50'>
        <HouseList data={data?.data} deleteItem={deleteItem} />
      </div>
      <PaginationComponent
        paging={paging}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
    </div>
  );
};

HouseIndex.propTypes = {
  title: PropTypes.string,
};

DataList.propTypes = {
  title: PropTypes.string,
};

export default HouseIndex;

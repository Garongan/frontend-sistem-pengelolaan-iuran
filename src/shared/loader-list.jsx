import { Skeleton } from '@/components/ui/skeleton';

const LoaderList = () => {
  return (
    <div className='mt-5 space-y-4 p-5 rounded-lg border border-zinc-200 bg-white text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50'>
      <Skeleton className='w-full h-16' />
      <Skeleton className='w-1/2 h-8' />
      <Skeleton className='w-full h-16' />
      <Skeleton className='w-1/2 h-8' />
      <Skeleton className='w-full h-16' />
      <Skeleton className='w-1/2 h-8' />
    </div>
  );
};

export default LoaderList;

import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { monthFormat } from '@/hooks/month-format';
import { priceFormat } from '@/hooks/price-format';
import { Loader2 } from 'lucide-react';
import PropTypes from 'prop-types';

export default function MonthlySpending({ month, spending }) {
  return (
    <Card>
      <CardHeader className='pb-2'>
        <CardDescription>
          Pengeluaran Bulan {monthFormat(month)}
        </CardDescription>
        <CardTitle className='text-3xl'>
          {spending ? (
            priceFormat(spending)
          ) : (
            <Loader2 className='animate-spin' />
          )}
        </CardTitle>
        <CardFooter />
      </CardHeader>
    </Card>
  );
}

MonthlySpending.propTypes = {
  month: PropTypes.number,
  spending: PropTypes.string,
};

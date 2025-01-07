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

export default function MonthlyIncome({ month, income }) {
  return (
    <Card>
      <CardHeader className='pb-2'>
        <CardDescription>Pemasukan Bulan {monthFormat(month)}</CardDescription>
        <CardTitle className='text-3xl'>
          {income ? priceFormat(income) : <Loader2 className='animate-spin' />}
        </CardTitle>
        <CardFooter />
      </CardHeader>
    </Card>
  );
}

MonthlyIncome.propTypes = {
  month: PropTypes.number,
  income: PropTypes.string,
};

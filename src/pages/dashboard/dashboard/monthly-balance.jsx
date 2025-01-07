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

export default function MonthlyBalance({ month, balance }) {
  return (
    <Card>
      <CardHeader className='pb-2'>
        <CardDescription>Sisa Saldo Bulan {monthFormat(month)}</CardDescription>
        <CardTitle className='text-3xl'>
          {balance ? (
            priceFormat(balance)
          ) : (
            <Loader2 className='animate-spin' />
          )}
        </CardTitle>
        <CardFooter />
      </CardHeader>
    </Card>
  );
}

MonthlyBalance.propTypes = {
  month: PropTypes.number,
  balance: PropTypes.string,
};

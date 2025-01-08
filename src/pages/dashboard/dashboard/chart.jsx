'use client';

import { Loader2, TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { monthFormat } from '@/hooks/month-format';
import PropTypes from 'prop-types';

const chartConfig = {
  income: {
    label: 'Pemasukan',
    color: 'hsl(var(--chart-1))',
  },
  spending: {
    label: 'Pengeluaran',
    color: 'hsl(var(--chart-2))',
  },
  balance: {
    label: 'Sisa Saldo',
    color: 'hsl(var(--chart-3))',
  },
};

export function Chart({ chartData, year, handleChangeYear }) {
  chartData = chartData?.map((value) => {
    return {
      month: monthFormat(value.month),
      income: value.income,
      spending: value.spending,
      balance: value.balance,
    };
  });

  let years = [];
  for (let index = 0; index < 10; index++) {
    years = [...years, new Date().getFullYear() - index];
  }

  return (
    <div className='lg:flex lg:justify-center lg:bg-white lg:rounded-lg lg:shadow-sm lg:border-zinc-200 lg:border'>
      <Card className='lg:w-3/4 lg:bg-transparent lg:shadow-none lg:border-none w-full'>
        <div className='flex justify-between sm:flex-row flex-col'>
          <CardHeader>
            <CardTitle>Laporan Tahun {year}</CardTitle>
            <CardDescription>
              Jumlah pemasukan dan pengeluaran per bulan di tahun {year}
            </CardDescription>
          </CardHeader>
          <div className='p-6'>
            <Select value={year} onValueChange={handleChangeYear}>
              <SelectTrigger
                className='ml-auto h-7 w-[130px] rounded-lg pl-2.5'
                aria-label='Select a value'
              >
                <SelectValue placeholder='Select month' />
              </SelectTrigger>
              <SelectContent align='end' className='rounded-xl'>
                {years.map((value, index) => {
                  return (
                    <SelectItem
                      key={index}
                      value={value}
                      className='rounded-lg [&_span]:flex'
                    >
                      <div className='flex items-center gap-2 text-sm'>
                        {value}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>
        <CardContent>
          {chartData ? (
            <ChartContainer config={chartConfig}>
              <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey='month'
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator='line' />}
                />
                <defs>
                  <linearGradient id='fillIncome' x1='0' y1='0' x2='0' y2='1'>
                    <stop
                      offset='5%'
                      stopColor='var(--color-income)'
                      stopOpacity={0.8}
                    />
                    <stop
                      offset='95%'
                      stopColor='var(--color-income)'
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                  <linearGradient id='fillSpending' x1='0' y1='0' x2='0' y2='1'>
                    <stop
                      offset='5%'
                      stopColor='var(--color-spending)'
                      stopOpacity={0.8}
                    />
                    <stop
                      offset='95%'
                      stopColor='var(--color-spending)'
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                  <linearGradient id='fillBalance' x1='0' y1='0' x2='0' y2='1'>
                    <stop
                      offset='5%'
                      stopColor='var(--color-balance)'
                      stopOpacity={0.8}
                    />
                    <stop
                      offset='95%'
                      stopColor='var(--color-balance)'
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <Area
                  dataKey='income'
                  type='natural'
                  fill='url(#fillIncome)'
                  fillOpacity={0.4}
                  stroke='var(--color-income)'
                  stackId='a'
                />
                <Area
                  dataKey='spending'
                  type='natural'
                  fill='url(#fillSpending)'
                  fillOpacity={0.4}
                  stroke='var(--color-spending)'
                  stackId='a'
                />
                <Area
                  dataKey='balance'
                  type='natural'
                  fill='url(#fillBalance)'
                  fillOpacity={0.4}
                  stroke='var(--color-balance)'
                  stackId='a'
                />
                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            </ChartContainer>
          ) : (
            <div className='flex justify-center items-center h-24'>
              <Loader2 className='animate-spin' />
            </div>
          )}
        </CardContent>
        <CardFooter>
          <div className='flex w-full items-start gap-2 text-sm'>
            <div className='grid gap-2'>
              <div className='flex items-center gap-2 font-medium leading-none'>
                Grafik jumlah pemasukan dan pengeluaran{' '}
                <TrendingUp className='h-4 w-4' />
              </div>
              <div className='flex items-center gap-2 leading-none text-muted-foreground'>
                Januari - Desember {year}
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

Chart.propTypes = {
  year: PropTypes.number,
  chartData: PropTypes.array,
  handleChangeYear: PropTypes.func,
};

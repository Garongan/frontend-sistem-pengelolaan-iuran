import { monthFormat } from '@/hooks/month-format';
import useReport from '@/hooks/use-report';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Chart } from './chart';
import MonthlyBalance from './monthly-balance';
import MonthlyIncome from './monthly-income';
import MonthlyReportList from './monthly-report-list';
import MonthlySpending from './monthly-spending';

const Dashboard = ({ title }) => {
  const { getMonthly, getYearly, downloadReportMonnthly } = useReport();
  const [date, setDate] = useState(new Date());
  const [dateFormOpen, setDateFormOpen] = useState(false);
  let yearlyParam = date.getFullYear();

  const handleGetMonthly = async () => {
    try {
      const response = await getMonthly({
        year: date.getFullYear(),
        month: date.getMonth() + 1,
      });
      return response.data;
    } catch (error) {
      console.clear();
    }
  };

  const handleGetYearly = async () => {
    let response = await getYearly({
      year: yearlyParam,
    });
    return response.data;
  };

  const handleDeleteDate = () => {
    setDate(new Date());
  };

  const handleDownloadReport = async () => {
    const response = await downloadReportMonnthly({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `laporan bulanan-${monthFormat(
        date.getMonth() + 1
      )}-${date.getFullYear()}.pdf`
    );
    document.body.appendChild(link);
    link.click();

    // clean a link
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const monthly = useQuery({
    queryKey: ['report-month', date],
    queryFn: handleGetMonthly,
    placeholderData: keepPreviousData,
    staleTime: 5000,
  });

  const yearly = useQuery({
    queryKey: ['report-year', yearlyParam],
    queryFn: handleGetYearly,
    placeholderData: keepPreviousData,
    staleTime: 5000,
  });

  return (
    <>
      <div className='flex items-center justify-between space-y-2 pb-4'>
        <h2 className='text-xl md:text-3xl font-bold tracking-tight'>
          {title}
        </h2>
      </div>
      <div className='grid grid-cols-1 gap-4'>
        <div className='grid grid-cols-1 gap-4 col-span-2'>
          <Chart chartData={yearly?.data} year={yearlyParam} />
          <div className='flex flex-col gap-4'>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
              <MonthlyBalance
                month={date.getMonth() + 1}
                balance={monthly.data?.balance}
              />
              <MonthlyIncome
                month={date.getMonth() + 1}
                income={monthly.data?.income}
              />
              <MonthlySpending
                month={date.getMonth() + 1}
                spending={monthly.data?.spending}
              />
            </div>
            <MonthlyReportList
              data={monthly.data}
              date={date}
              handleDeleteDate={handleDeleteDate}
              setDate={setDate}
              handleDownloadReport={handleDownloadReport}
              dateFormOpen={dateFormOpen}
              month={date.getMonth() + 1}
              setDateFormOpen={setDateFormOpen}
            />
          </div>
        </div>
      </div>
    </>
  );
};

Dashboard.propTypes = {
  title: PropTypes.string,
};

export default Dashboard;

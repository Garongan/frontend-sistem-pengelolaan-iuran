import PropTypes from 'prop-types';
import MonthRevenue from './MonthRevenue';
import OrderDetails from './OrderDetails';
import OrderList from './OrderList';
import WeekRevenue from './WeekRevenue';

const Dashboard = ({ title }) => {
  return (
    <>
      <div className='flex items-center justify-between space-y-2 pb-4'>
        <h2 className='text-xl md:text-3xl font-bold tracking-tight'>
          {title}
        </h2>
      </div>
      <div className='grid grid-cols-3 gap-4'>
        <div className='grid grid-cols-1 gap-4 col-span-2'>
          <div className='grid grid-cols-2 gap-4'>
            <WeekRevenue />
            <MonthRevenue />
          </div>
          <OrderList />
        </div>
        <OrderDetails />
      </div>
    </>
  );
};

Dashboard.propTypes = {
  title: PropTypes.string,
};

export default Dashboard;

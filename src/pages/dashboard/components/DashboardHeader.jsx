import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Profile from '../profile/Profile';

const DashboardHeader = () => {
  const nav = [
    {
      title: 'Dashboard',
      link: '/dashboard',
    },
    {
      title: 'Penghuni',
      link: '/dashboard/resident',
    },
    {
      title: 'Rumah',
      link: '/dashboard/menu',
    },
    {
      title: 'Pembayaran',
      link: '/dashboard/customers',
    },
  ];
  return (
    <>
      <div className='border-b'>
        <div className='flex h-16 items-center'>
          <nav className='flex items-start space-x-4 lg:space-x-6'>
            {nav.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className='text-sm font-medium transition-colors hover:text-primary'
              >
                {item.title}
              </Link>
            ))}
          </nav>
          <div className='ml-auto flex items-center space-x-4'>
            <Profile />
          </div>
        </div>
      </div>
    </>
  );
};

DashboardHeader.propTypes = {
  handleSetTitle: PropTypes.func,
};

export default DashboardHeader;

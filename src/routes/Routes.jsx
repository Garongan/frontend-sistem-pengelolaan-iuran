import { Error404, Error500 } from '@/components/ui/error-pages';
import Login from '@/pages/auth/login';
import BillsForm from '@/pages/dashboard/bills/BillsForm';
import BillsIndex from '@/pages/dashboard/bills/BillsIndex';
import BillsLayout from '@/pages/dashboard/bills/BillsLayout';
import CustomersForm from '@/pages/dashboard/customers/CustomersForm';
import CustomersIndex from '@/pages/dashboard/customers/CustomersIndex';
import CustomersLayout from '@/pages/dashboard/customers/CustomersLayout';
import DashboardLayout from '@/pages/dashboard/dashboard-layout';
import Dashboard from '@/pages/dashboard/dashboard/dashboard';
import HouseAddResident from '@/pages/dashboard/house/house-add-resident';
import HouseForm from '@/pages/dashboard/house/house-form';
import HouseIndex from '@/pages/dashboard/house/house-index';
import HouseLayout from '@/pages/dashboard/house/house-layout';
import HouseListResident from '@/pages/dashboard/house/house-list-resident';
import {
  default as ResidentForm,
  default as TableForm,
} from '@/pages/dashboard/resident/resident-form';
import ResidentIndex from '@/pages/dashboard/resident/resident-index';
import ResidentLayout from '@/pages/dashboard/resident/resident-layout';
import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoutes from './protected-routes';

const Routes = createBrowserRouter([
  {
    path: '*',
    element: <Error404 />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoutes>
        <Login />
      </ProtectedRoutes>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoutes>
        <DashboardLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        index: true,
        element: <Dashboard title='Dashboard' />,
      },
      {
        path: 'resident',
        element: <ResidentLayout />,
        errorElement: <Error500 />,
        children: [
          {
            index: true,
            element: <ResidentIndex title='Data penghuni' />,
          },
          {
            path: 'new',
            element: (
              <ResidentForm title='Formulir Penghuni Baru' isEditMode={false} />
            ),
          },
          {
            path: 'update/:id',
            element: (
              <TableForm title='Formulir Mengubah Penghuni' isEditMode={true} />
            ),
          },
        ],
      },
      {
        path: 'house',
        element: <HouseLayout />,
        errorElement: <Error500 />,
        children: [
          {
            index: true,
            element: <HouseIndex title='Data Rumah' />,
          },
          {
            path: 'new',
            element: <HouseForm title='Formulir Rumah Baru' />,
          },
          {
            path: 'update/:id',
            element: <HouseForm title='Formulir Mengubah Rumah' />,
          },
          {
            path: 'add-resident/:id',
            element: (
              <HouseAddResident title='Formulir Menambah Penghuni di Rumah' />
            ),
          },
          {
            path: 'list-resident/:id',
            element: (
              <HouseListResident title='Daftar Penghuni di Rumah' />
            ),
          },
        ],
      },
      {
        path: 'payment',
        element: <CustomersLayout />,
        errorElement: <Error500 />,
        children: [
          {
            index: true,
            element: <CustomersIndex title='Customers' />,
          },
          {
            path: 'new',
            element: <CustomersForm title='Create Customer Form' />,
          },
          {
            path: 'update/:id',
            element: <CustomersForm title='Update Customer Form' />,
          },
        ],
      },
      {
        path: 'bills',
        element: <BillsLayout />,
        errorElement: <Error500 />,
        children: [
          {
            index: true,
            element: <BillsIndex title='Bills' />,
          },
          {
            path: 'new',
            element: <BillsForm title='Create Bill Form' />,
          },
          {
            path: 'update/:id',
            element: <BillsForm title='Update Bill Form' />,
          },
        ],
      },
    ],
  },
]);

export default Routes;

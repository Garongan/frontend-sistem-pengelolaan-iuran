import { Error404, Error500 } from '@/components/ui/error-pages';
import Login from '@/pages/auth/Login';
import DashboardLayout from '@/pages/dashboard/DashboardLayout';
import BillsForm from '@/pages/dashboard/bills/BillsForm';
import BillsIndex from '@/pages/dashboard/bills/BillsIndex';
import BillsLayout from '@/pages/dashboard/bills/BillsLayout';
import CustomersForm from '@/pages/dashboard/customers/CustomersForm';
import CustomersIndex from '@/pages/dashboard/customers/CustomersIndex';
import CustomersLayout from '@/pages/dashboard/customers/CustomersLayout';
import Dashboard from '@/pages/dashboard/dashboard/Dashboard';
import MenuForm from '@/pages/dashboard/menu/MenuForm';
import MenuIndex from '@/pages/dashboard/menu/MenuIndex';
import MenuLayout from '@/pages/dashboard/menu/MenuLayout';
import {
  default as ResidentForm,
  default as TableForm,
} from '@/pages/dashboard/resident/ResidentForm';
import ResidentIndex from '@/pages/dashboard/resident/ResidentIndex';
import ResidentLayout from '@/pages/dashboard/resident/ResidentLayout';
import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';

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
        // errorElement: <Error500 />,
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
        path: 'home',
        element: <MenuLayout />,
        errorElement: <Error500 />,
        children: [
          {
            index: true,
            element: <MenuIndex title='Menu' />,
          },
          {
            path: 'new',
            element: <MenuForm title='Create Menu Form' />,
          },
          {
            path: 'update/:id',
            element: <MenuForm title='Update Menu Form' />,
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

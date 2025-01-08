import { Error404, Error500 } from '@/components/ui/error-pages';
import Login from '@/pages/auth/login';
import DashboardLayout from '@/pages/dashboard/dashboard-layout';
import Dashboard from '@/pages/dashboard/dashboard/dashboard';
import ExpenseForm from '@/pages/dashboard/expense/expense-form';
import ExpenseIndex from '@/pages/dashboard/expense/expense-index';
import ExpenseLayout from '@/pages/dashboard/expense/expense-layout';
import HouseAddResident from '@/pages/dashboard/house/house-add-resident';
import HouseForm from '@/pages/dashboard/house/house-form';
import HouseIndex from '@/pages/dashboard/house/house-index';
import HouseLayout from '@/pages/dashboard/house/house-layout';
import HouseListResident from '@/pages/dashboard/house/house-list-resident';
import PaymentForm from '@/pages/dashboard/payment/payment-form';
import PaymentIndex from '@/pages/dashboard/payment/payment-index';
import PaymentLayout from '@/pages/dashboard/payment/payment-layout';
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
        errorElement: <Error500 />,
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
            element: <HouseListResident title='Daftar Penghuni di Rumah' />,
          },
        ],
      },
      {
        path: 'payment',
        element: <PaymentLayout />,
        errorElement: <Error500 />,
        children: [
          {
            index: true,
            element: <PaymentIndex title='Pembayaran' />,
          },
          {
            path: 'new',
            element: <PaymentForm title='Formulir Pembayaran Iuran Baru' />,
          },
        ],
      },
      {
        path: 'expense',
        element: <ExpenseLayout />,
        errorElement: <Error500 />,
        children: [
          {
            index: true,
            element: <ExpenseIndex title='Pengeluaran' />,
          },
          {
            path: 'new',
            element: <ExpenseForm title='Formulir Pengeluaran Iuran Baru' />,
          },
        ],
      },
    ],
  },
]);

export default Routes;

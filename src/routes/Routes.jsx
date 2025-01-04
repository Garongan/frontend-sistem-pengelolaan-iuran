import Error404 from "@/components/ui/error404";
import Login from "@/pages/auth/Login";
import Registration from "@/pages/auth/Registration";
import Register from "@/pages/auth/components/Register";
import DashboardLayout from "@/pages/dashboard/DashboardLayout";
import CustomersForm from "@/pages/dashboard/customers/CustomersForm";
import CustomersIndex from "@/pages/dashboard/customers/CustomersIndex";
import CustomersLayout from "@/pages/dashboard/customers/CustomersLayout";
import Dashboard from "@/pages/dashboard/dashboard/Dashboard";
import MenuForm from "@/pages/dashboard/menu/MenuForm";
import MenuIndex from "@/pages/dashboard/menu/MenuIndex";
import MenuLayout from "@/pages/dashboard/menu/MenuLayout";
import TableForm from "@/pages/dashboard/table/TableForm";
import TableIndex from "@/pages/dashboard/table/TableIndex";
import TableLayout from "@/pages/dashboard/table/TableLayout";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import BillsLayout from "@/pages/dashboard/bills/BillsLayout";
import BillsIndex from "@/pages/dashboard/bills/BillsIndex";
import BillsForm from "@/pages/dashboard/bills/BillsForm";

const Routes = createBrowserRouter([
    {
        path: "*",
        element: <Error404 />,
    },
    {
        path: "/",
        element: <h2>Home</h2>,
    },
    {
        path: "/register",
        element: <Registration />,
        children: [
            {
                index: true,
                element: <Register title="user" isAdmin={false} />,
            },
            {
                path: "admin",
                element: (
                    <ProtectedRoutes path="register/admin">
                        <Register title="admin" isAdmin={true} />
                    </ProtectedRoutes>
                ),
            },
        ],
    },
    {
        path: "/login",
        element: (
            <ProtectedRoutes>
                <Login />
            </ProtectedRoutes>
        ),
    },
    {
        path: "/",
        element: <h2>Home</h2>,
    },
    {
        path: "/dashboard",
        element: (
            <ProtectedRoutes>
                <DashboardLayout />
            </ProtectedRoutes>
        ),
        children: [
            {
                index: true,
                element: <Dashboard title="Dashboard" />,
            },
            {
                path: "table",
                element: <TableLayout />,
                children: [
                    {
                        index: true,
                        element: <TableIndex title="Table" />,
                    },
                    {
                        path: "new",
                        element: <TableForm title="Create Table Form" />,
                    },
                    {
                        path: "update/:id",
                        element: <TableForm title="Updata Table Form" />,
                    },
                ],
            },
            {
                path: "menu",
                element: <MenuLayout />,
                children: [
                    {
                        index: true,
                        element: <MenuIndex title="Menu" />,
                    },
                    {
                        path: "new",
                        element: <MenuForm title="Create Menu Form" />,
                    },
                    {
                        path: "update/:id",
                        element: <MenuForm title="Update Menu Form" />,
                    },
                ],
            },
            {
                path: "customers",
                element: <CustomersLayout />,
                children: [
                    {
                        index: true,
                        element: <CustomersIndex title="Customers" />,
                    },
                    {
                        path: "new",
                        element: <CustomersForm title="Create Customer Form" />,
                    },
                    {
                        path: "update/:id",
                        element: <CustomersForm title="Update Customer Form" />,
                    },
                ],
            },
            {
                path: "bills",
                element: <BillsLayout />,
                children: [
                    {
                        index: true,
                        element: <BillsIndex title="Bills" />,
                    },
                    {
                        path: "new",
                        element: <BillsForm title="Create Bill Form" />,
                    },
                    {
                        path: "update/:id",
                        element: <BillsForm title="Update Bill Form" />,
                    },
                ],
            },
        ],
    },
]);

export default Routes;

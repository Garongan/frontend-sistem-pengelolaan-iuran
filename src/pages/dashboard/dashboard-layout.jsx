import {
  Sidebar,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import useAuthService from '@/hooks/use-auth';
import {
  CircleUser,
  CreditCard,
  Home,
  LayoutDashboard,
  Loader2,
  LogOut,
  Receipt,
  Users,
} from 'lucide-react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const AppSideBar = () => {
  const user = localStorage.getItem('user');
  const name = user ? JSON.parse(user).user[0].name : '';
  const navigate = useNavigate();
  const authService = useAuthService();
  const [isLoading, setIsLoading] = useState(false);
  const handleLogout = async () => {
    setIsLoading(true);
    await authService.logout();
    setIsLoading(false);
    navigate('/');
  };

  const items = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      title: 'Penghuni',
      url: '/dashboard/resident',
      icon: Users,
    },
    {
      title: 'Rumah',
      url: '/dashboard/house',
      icon: Home,
    },
    {
      title: 'Pembayaran Iuran',
      url: '/dashboard/payment',
      icon: CreditCard,
    },
    {
      title: 'Pengeluaran Iuran',
      url: '/dashboard/expense',
      icon: Receipt,
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className='py-5 flex flex-col gap-5 justify-center items-center'>
          <CircleUser size={32} />
          <div className='text-xl font-bold'>{name}</div>
        </div>
      </SidebarHeader>
      <SidebarGroup>
        <SidebarGroupLabel>Dashboard Menu</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel>Actions</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={handleLogout}>
                {isLoading ? (
                  <Loader2 className='animate-spin' />
                ) : (
                  <>
                    <LogOut />
                    <span>Log out</span>
                  </>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </Sidebar>
  );
};

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <AppSideBar />
      <main className='py-5 w-full overflow-auto'>
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

DashboardLayout.propTypes = {
  title: PropTypes.string,
};

export default DashboardLayout;

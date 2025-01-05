import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useAuth from '@/hooks/use-auth';
import { Home, Loader2 } from 'lucide-react';

const schema = z.object({
  email: z.string().email().min(4, {
    message: 'Email diperlukan',
  }),
  password: z.string().min(8, {
    message: 'Password minimal harus 8 karakter',
  }),
});

const Login = () => {
  const service = useAuth();
  const navigate = useNavigate();
  const [failLogin, setFailLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await service.login(data);
      if (response && response.statusCode === 200) {
        setFailLogin(false);
        setIsLoading(false);
        localStorage.setItem('user', JSON.stringify(response.data));
        navigate('/dashboard');
      }
    } catch (error) {
      setFailLogin(true);
    }
  };

  const failLoginAlert = () => {
    setFailLogin(false);
    toast({
      variant: 'destructive',
      title: 'Upsss! Terdapat Kesalahan Login.',
      description: 'Username atau password gagal di otentifikasi.',
      action: <ToastAction altText='Try again'>Try again</ToastAction>,
    });
  };

  return (
    <>
      <div className='min-h-screen flex items-center justify-center'>
        <div className='overflow-hidden rounded-[0.5rem] border bg-background shadow-md md:shadow-xl'>
          <div className='container relative grid flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0'>
            <div className='relative hidden h-full flex-col bg-muted text-white lg:flex dark:border-r'>
              <div className='absolute inset-0 bg-zinc-900'>
                <img src='/banner.jpg' alt='banner' />
              </div>
              <div className='relative z-20 flex items-center text-lg font-medium bg-gradient-to-b from-black to-tranparent p-5'>
                <Home className='me-3' />
                Perumahan Permata Tlogomas
              </div>
              <div className='relative z-20 mt-auto p-5 bg-gradient-to-t from-black to-tranparent'>
                <blockquote className='space-y-2'>
                  <p className='text-lg'>
                    &quot;Perumahan Permata Tlogomas: Hunian nyaman di tengah
                    kota malang&quot;
                  </p>
                  <footer className='text-sm'>
                    Founder: Alvindo Tri Jatmiko
                  </footer>
                </blockquote>
              </div>
            </div>
            <div className='lg:p-8'>
              <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
                <div className='flex flex-col space-y-2 text-center'>
                  <h1 className='text-2xl font-semibold tracking-tight'>
                    Masuk
                  </h1>
                  <p className='text-sm text-muted-foreground'>
                    Masukkan email dan password untuk masuk
                  </p>
                </div>
                <div className='grid gap-6'>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className='grid gap-4'
                    >
                      <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type='text'
                                placeholder='Masukkan email disini...'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name='password'
                        type='password'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input
                                type='password'
                                placeholder='Masukkan password disini...'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type='submit'
                        className='w-full my-2'
                        disabled={!form.formState.isValid}
                      >
                        {isLoading ? (
                          <Loader2 className='animate-spin' />
                        ) : (
                          'Submit'
                        )}
                      </Button>
                    </form>
                  </Form>
                  {failLogin && failLoginAlert()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

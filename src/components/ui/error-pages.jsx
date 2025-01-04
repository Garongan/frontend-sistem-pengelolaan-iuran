import error404 from "@/assets/images/undraw_page_not_found_re_e9o6.svg";
import error500 from '@/assets/images/undraw_server-down_lxs9.svg';
import { Link } from "react-router-dom";

export const Error404 = () => {
    return (
        <>
            <section className="min-h-screen flex flex-col gap-5 items-center justify-center">
                <img src={error404} alt="error-banner" className="w-50" />
                <Link to="/" className="hover:underline">
                    Go back to Home
                </Link>
            </section>
        </>
    );
};

export const Error500 = () => {
  return (
    <>
      <section className='min-h-screen flex flex-col gap-5 items-center justify-center'>
        <img src={error500} alt='error-banner' className='w-50' />
        <Link to='/dashboard' className='hover:underline'>
          Go back to dashboard
        </Link>
      </section>
    </>
  );
};

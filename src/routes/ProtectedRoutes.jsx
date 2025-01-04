import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoutes = ({ children, path }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      if (!localStorage.getItem('user')) {
        navigate('/');
      }
    };
    checkToken();
  }, [navigate, path]);

  return <>{children}</>;
};

ProtectedRoutes.propTypes = {
  children: PropTypes.node,
  path: PropTypes.string,
};

export default ProtectedRoutes;

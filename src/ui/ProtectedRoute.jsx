import { useUser } from '../features/authentication/useUser.js';
import Spinner from './Spinner.jsx';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // 1 Load authenticated user
  const { isLoading, isAuthenticated } = useUser();

  // 3 If No user, redirect to /login
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate('./login');
  }, [navigate, isLoading, isAuthenticated]);

  // 2 While -- spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  // 4 If IS login -> render the app
  return children;
}

export default ProtectedRoute;

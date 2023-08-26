import { useEffect, useState } from 'react';
import Button from '../../ui/Button.jsx';
import Form from '../../ui/Form.jsx';
import Input from '../../ui/Input';
import FormRowVertical from '../../ui/FormRowVertical.jsx';
import { useLogin } from './useLogin.js';
import SpinnerMini from '../../ui/SpinnerMini.jsx';
import { useUser } from './useUser.js';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('test@te.st');
  const [password, setPassword] = useState('pass1234');
  const { login, isLoading } = useLogin();

  //todo solve notRedirecting on login after logout without pageRefresh
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard');
  }, [isAuthenticated, navigate]);
  /////

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled() {
          setEmail('');
          setPassword('');
        }
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button $size="large" disabled={isLoading}>
          {!isLoading ? 'Login' : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;

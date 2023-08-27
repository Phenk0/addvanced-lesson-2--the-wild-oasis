import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { login as loginApi } from '../../services/apiAuth.js';

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess({ user }) {
      queryClient.setQueryData(['user'], user);
      toast.success('User is logged in');
      navigate('/dashboard', { replace: true });
    },
    onError(err) {
      console.log('ERROR: ', err);
      toast.error('Provided email or password are incorrect');
    }
  });
  return { login, isLoading };
}

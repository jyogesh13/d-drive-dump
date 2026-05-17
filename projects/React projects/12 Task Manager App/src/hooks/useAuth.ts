import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api';
import { useAuthStore } from '../store/authStore';
import type { AxiosError } from 'axios';
import type { ApiError } from '../types';

export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ userInput, password }: { userInput: string; password: string }) =>
      authApi.login(userInput, password),
    onSuccess: (res) => {
      setAuth(res.data.user);
      navigate('/');
    },
    onError: (error: AxiosError<ApiError>) => {
      console.error('Login failed:', error.response?.data?.message);
    },
  });
}

export function useRegister() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({
      username,
      email,
      password,
    }: {
      username: string;
      email: string;
      password: string;
    }) => authApi.register(username, email, password),
    onSuccess: (res) => {
      setAuth(res.data.user);
      navigate('/');
    },
    onError: (error: AxiosError<ApiError>) => {
      console.error('Register failed:', error.response?.data?.message);
    },
  });
}

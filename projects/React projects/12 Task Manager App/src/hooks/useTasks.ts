import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tasksApi } from '../api';
import { QUERY_KEYS } from '../constants';
import type { TaskFilters, CreateTaskPayload, UpdateTaskPayload, ApiError, Task, ApiResponse } from '../types';
import type { AxiosError } from 'axios';

export function useTasks(filters?: TaskFilters) {
  return useQuery<ApiResponse<Task[]>, AxiosError<ApiError>>({
    queryKey: [QUERY_KEYS.TASKS, filters],
    queryFn: () => tasksApi.getAll(filters),
  });
}

export function useTask(id: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.TASK, id],
    queryFn: () => tasksApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateTaskPayload) => tasksApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TASKS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BOARD_TASKS] });
    },
    onError: (error: AxiosError<ApiError>) => {
      console.error('Create task failed:', error.response?.data?.message);
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateTaskPayload }) =>
      tasksApi.update(id, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TASKS] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.TASK, variables.id],
      });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BOARD_TASKS] });
    },
    onError: (error: AxiosError<ApiError>) => {
      console.error('Update task failed:', error.response?.data?.message);
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => tasksApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TASKS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BOARD_TASKS] });
    },
    onError: (error: AxiosError<ApiError>) => {
      console.error('Delete task failed:', error.response?.data?.message);
    },
  });
}

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { boardsApi } from '../api';
import { QUERY_KEYS } from '../constants';
import type { CreateBoardPayload, TaskFilters, ApiError } from '../types';
import type { AxiosError } from 'axios';

export function useBoards() {
  return useQuery({
    queryKey: [QUERY_KEYS.BOARDS],
    queryFn: () => boardsApi.getAll(),
  });
}

export function useBoard(id: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.BOARD, id],
    queryFn: () => boardsApi.getById(id),
    enabled: !!id,
  });
}

export function useBoardTasks(boardId: string, filters?: TaskFilters) {
  return useQuery({
    queryKey: [QUERY_KEYS.BOARD_TASKS, boardId, filters],
    queryFn: () => boardsApi.getTasks(boardId, filters),
    enabled: !!boardId,
  });
}

export function useCreateBoard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateBoardPayload) => boardsApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BOARDS] });
    },
    onError: (error: AxiosError<ApiError>) => {
      console.error('Create board failed:', error.response?.data?.message);
    },
  });
}

export function useDeleteBoard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => boardsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BOARDS] });
    },
    onError: (error: AxiosError<ApiError>) => {
      console.error('Delete board failed:', error.response?.data?.message);
    },
  });
}

export function useAddMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ boardId, userId }: { boardId: string; userId: string }) =>
      boardsApi.addMember(boardId, userId),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.BOARD, variables.boardId],
      });
    },
    onError: (error: AxiosError<ApiError>) => {
      console.error('Add member failed:', error.response?.data?.message);
    },
  });
}

export function useRemoveMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      boardId,
      memberId,
    }: {
      boardId: string;
      memberId: string;
    }) => boardsApi.removeMember(boardId, memberId),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.BOARD, variables.boardId],
      });
    },
    onError: (error: AxiosError<ApiError>) => {
      console.error('Remove member failed:', error.response?.data?.message);
    },
  });
}

export function useLeaveBoard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (boardId: string) => boardsApi.leave(boardId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BOARDS] });
    },
    onError: (error: AxiosError<ApiError>) => {
      console.error('Leave board failed:', error.response?.data?.message);
    },
  });
}

export function useTransferOwnership() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      boardId,
      newAdminId,
    }: {
      boardId: string;
      newAdminId: string;
    }) => boardsApi.transferOwnership(boardId, newAdminId),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.BOARD, variables.boardId],
      });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BOARDS] });
    },
    onError: (error: AxiosError<ApiError>) => {
      console.error('Transfer ownership failed:', error.response?.data?.message);
    },
  });
}

import { apiClient } from './client';
import { ENDPOINTS } from '../constants';
import type {
  ApiResponse,
  AuthResponse,
  Task,
  CreateTaskPayload,
  UpdateTaskPayload,
  TaskFilters,
  Board,
  CreateBoardPayload,
} from '../types';

// ───────────────────────── Auth ─────────────────────────
export const authApi = {
  login: (userInput: string, password: string) =>
    apiClient.post<unknown, AuthResponse>(ENDPOINTS.AUTH.LOGIN, {
      userInput,
      password,
    }),

  register: (username: string, email: string, password: string) =>
    apiClient.post<unknown, AuthResponse>(ENDPOINTS.AUTH.REGISTER, {
      username,
      email,
      password,
    }),
};

// ───────────────────────── Tasks ─────────────────────────
export const tasksApi = {
  getAll: (filters?: TaskFilters) =>
    apiClient.get<unknown, ApiResponse<Task[]>>(ENDPOINTS.TASKS.BASE, {
      params: filters,
    }),

  getById: (id: string) =>
    apiClient.get<unknown, ApiResponse<Task>>(ENDPOINTS.TASKS.BY_ID(id)),

  create: (payload: CreateTaskPayload) =>
    apiClient.post<unknown, ApiResponse<Task>>(ENDPOINTS.TASKS.BASE, payload),

  update: (id: string, payload: UpdateTaskPayload) =>
    apiClient.patch<unknown, ApiResponse<Task>>(
      ENDPOINTS.TASKS.BY_ID(id),
      payload
    ),

  delete: (id: string) =>
    apiClient.delete<unknown, ApiResponse<Record<string, never>>>(ENDPOINTS.TASKS.BY_ID(id)),
};

// ───────────────────────── Boards ─────────────────────────
export const boardsApi = {
  getAll: () =>
    apiClient.get<unknown, ApiResponse<Board[]>>(ENDPOINTS.BOARDS.BASE),

  getById: (id: string) =>
    apiClient.get<unknown, ApiResponse<Board>>(ENDPOINTS.BOARDS.BY_ID(id)),

  create: (payload: CreateBoardPayload) =>
    apiClient.post<unknown, ApiResponse<Board>>(ENDPOINTS.BOARDS.BASE, payload),

  delete: (id: string) =>
    apiClient.delete<unknown, ApiResponse<Record<string, never>>>(ENDPOINTS.BOARDS.BY_ID(id)),

  // Members
  addMember: (boardId: string, userId: string) =>
    apiClient.post<unknown, ApiResponse<Board>>(
      ENDPOINTS.BOARDS.MEMBERS(boardId),
      { userId }
    ),

  removeMember: (boardId: string, memberId: string) =>
    apiClient.delete<unknown, ApiResponse<Board>>(
      ENDPOINTS.BOARDS.REMOVE_MEMBER(boardId, memberId)
    ),

  leave: (boardId: string) =>
    apiClient.post<unknown, ApiResponse<Record<string, never>>>(ENDPOINTS.BOARDS.LEAVE(boardId)),

  transferOwnership: (boardId: string, newAdminId: string) =>
    apiClient.patch<unknown, ApiResponse<Board>>(
      ENDPOINTS.BOARDS.TRANSFER(boardId),
      { newAdminId }
    ),

  // Board Tasks
  getTasks: (boardId: string, filters?: TaskFilters) =>
    apiClient.get<unknown, ApiResponse<Task[]>>(
      ENDPOINTS.BOARDS.TASKS(boardId),
      { params: filters }
    ),
};

// ───────────────────────── Upload ─────────────────────────
export const uploadApi = {
  getSignature: () =>
    apiClient.get<unknown, ApiResponse<{ signature: string; timestamp: number; cloudName: string; apiKey: string }>>(
      ENDPOINTS.UPLOAD.SIGNATURE
    ),
};

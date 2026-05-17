export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/users/login',
    REGISTER: '/users/register',
    ME: '/users/me',
  },
  TASKS: {
    BASE: '/tasks',
    BY_ID: (id: string) => `/tasks/${id}`,
  },
  BOARDS: {
    BASE: '/boards',
    BY_ID: (id: string) => `/boards/${id}`,
    MEMBERS: (boardId: string) => `/boards/${boardId}/members`,
    REMOVE_MEMBER: (boardId: string, memberId: string) =>
      `/boards/${boardId}/members/${memberId}`,
    LEAVE: (boardId: string) => `/boards/${boardId}/leave`,
    TRANSFER: (boardId: string) => `/boards/${boardId}/transfer`,
    TASKS: (boardId: string) => `/boards/${boardId}/tasks`,
  },
  UPLOAD: {
    SIGNATURE: '/upload/signature',
  },
} as const;

export const QUERY_KEYS = {
  TASKS: 'tasks',
  TASK: 'task',
  BOARDS: 'boards',
  BOARD: 'board',
  BOARD_TASKS: 'boardTasks',
  USER: 'user',
} as const;


export const TASK_STATUSES = ['todo', 'in-progress', 'done'] as const;
export const TASK_PRIORITIES = ['low', 'medium', 'high'] as const;

export type TaskStatus = (typeof TASK_STATUSES)[number];
export type TaskPriority = (typeof TASK_PRIORITIES)[number];

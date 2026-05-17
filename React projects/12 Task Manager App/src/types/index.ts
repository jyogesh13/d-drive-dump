type Priority = 'low' | 'medium' | 'high';

// ---- User ----
export interface User {
  _id: string;
  username: string;
}

export interface AuthResponse {
  data: {
    token: string;
    user: User;
  };
  message: string;
}

// ---- Task ----
export interface Attachment {
  url: string;
  public_id: string;
}

export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: Priority;
  dueDate?: string;
  createdBy: User;
  assignedTo?: User;
  boardId?: string;
  attachments?: Attachment[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateTaskPayload {
  title: string;
  description?: string;
  dueDate?: string;
  priority: Priority;
  assignedTo?: string;
  boardId?: string;
  attachments?: Attachment[];
}

export interface UpdateTaskPayload {
  title?: string;
  description?: string;
  status?: 'todo' | 'in-progress' | 'done';
  priority?: Priority;
  dueDate?: string;
  assignedTo?: string;
  keepAttachments?: string[];
  newAttachments?: Attachment[];
}

export interface TasksResponse {
  data: Task[];
  message: string;
  meta: PaginationMeta;
}

// ---- Board ----
export interface BoardMember {
  user: User;
}

export interface Board {
  _id: string;
  name: string;
  description?: string;
  admin: User;
  members?: BoardMember[];
  totalMembers?: number;
  isAdmin?: boolean;
}

export interface CreateBoardPayload {
  name: string;
  description?: string;
}

export interface BoardsResponse {
  data: Board[];
  message: string;
}

// ---- Shared ----
export interface PaginationMeta {
  page: number;
  limit: number;
  hasNextPage: boolean;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  meta?: PaginationMeta;
}

export interface ApiError {
  success: false;
  message: string;
  errors: string[];
}

// ---- Socket Events ----
export interface TaskReminderEvent {
  taskId: string;
  title: string;
  message: string;
}

export interface TaskCompletedEvent {
  taskId: string;
  title: string;
  completedBy: string;
  message: string;
}

// ---- Filters ----
export interface TaskFilters {
  status?: string;
  priority?: string;
  page?: number;
  limit?: number;
}

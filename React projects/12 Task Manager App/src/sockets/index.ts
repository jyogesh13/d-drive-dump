import { io, Socket } from 'socket.io-client';
import { useUIStore } from '../store/uiStore';
import type { TaskReminderEvent, TaskCompletedEvent } from '../types';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

let socket: Socket | null = null;

export function connectSocket(userId: string) {
  if (socket?.connected) return;

  socket = io(SOCKET_URL, {
    auth: { userId },
  });

  socket.on('connect', () => {
    console.log('[Socket] Connected:', socket?.id);
  });

  socket.on('task-reminder', (data: TaskReminderEvent) => {
    useUIStore.getState().addNotification({
      id: `reminder-${data.taskId}-${Date.now()}`,
      type: 'reminder',
      title: data.title,
      message: data.message,
      timestamp: Date.now(),
    });
  });

  socket.on('task-completed', (data: TaskCompletedEvent) => {
    useUIStore.getState().addNotification({
      id: `completed-${data.taskId}-${Date.now()}`,
      type: 'completed',
      title: data.title,
      message: data.message,
      timestamp: Date.now(),
    });
  });

  socket.on('disconnect', () => {
    console.log('[Socket] Disconnected');
  });
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

export function getSocket() {
  return socket;
}

import { create } from 'zustand';

interface UIState {
  // Theme
  theme: 'light' | 'dark';
  toggleTheme: () => void;

  // Modals
  isCreateTaskModalOpen: boolean;
  isCreateBoardModalOpen: boolean;
  isAddMemberModalOpen: boolean;
  openCreateTaskModal: () => void;
  closeCreateTaskModal: () => void;
  openCreateBoardModal: () => void;
  closeCreateBoardModal: () => void;
  openAddMemberModal: () => void;
  closeAddMemberModal: () => void;

  // Sidebar
  isSidebarOpen: boolean;
  toggleSidebar: () => void;

  // Notifications
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export interface Notification {
  id: string;
  type: 'reminder' | 'completed' | 'info' | 'error';
  title: string;
  message: string;
  timestamp: number;
}

export const useUIStore = create<UIState>()((set) => ({
  // Theme
  theme:
    (typeof window !== 'undefined' &&
      (localStorage.getItem('theme') as 'light' | 'dark')) ||
    'dark',
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      return { theme: newTheme };
    }),

  // Modals
  isCreateTaskModalOpen: false,
  isCreateBoardModalOpen: false,
  isAddMemberModalOpen: false,
  openCreateTaskModal: () => set({ isCreateTaskModalOpen: true }),
  closeCreateTaskModal: () => set({ isCreateTaskModalOpen: false }),
  openCreateBoardModal: () => set({ isCreateBoardModalOpen: true }),
  closeCreateBoardModal: () => set({ isCreateBoardModalOpen: false }),
  openAddMemberModal: () => set({ isAddMemberModalOpen: true }),
  closeAddMemberModal: () => set({ isAddMemberModalOpen: false }),

  // Sidebar
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  // Notifications
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications].slice(0, 50),
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
  clearNotifications: () => set({ notifications: [] }),
}));

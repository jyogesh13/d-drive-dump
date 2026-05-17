import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Task {
    id: string
    title: string;
    description: string;
    createdAt: string;
    priority: string;
    status: string
}

interface PlannerState {

    tasks: Task[];
    addTasks: (payload: Task) => void;
    deleteTask: (id: string) => void;
    changeTaskStatus: (id: string, status: string) => void;
    deleteAllTask: () => void;
}


export const usePlanner = create<PlannerState>()(persist(
    (set) => ({
        tasks: [],
        addTasks: (payload) => set((state) => ({
            tasks: [...state.tasks, payload]
        })),
        deleteTask: (id) => set((state) => ({
            tasks: state.tasks.filter(item => item.id !== id)
        })),
        changeTaskStatus: (id, status) => set((state) => ({
            tasks: state.tasks.filter(item => {
                if (item.id === id) {
                    item.status = status
                }
                return item
            })
        })),
        deleteAllTask: () => set(() => ({
            tasks: []
        }))
    }),
    {
        name: "planner"
    }
))
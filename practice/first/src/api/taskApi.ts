import type { Task } from "../types/taskTypes"

let tasks: Task[] = []
export const getTasks = async (): Promise<Task[]> => {
    return new Promise((res) => setTimeout(() => res(tasks), 300))
}
export const createTask = async (title: string): Promise<Task> => {
    console.log({title})
    const newTask = {
        id: Date.now().toString(),
        title,
        completed: false
    }
    tasks.push(newTask)
    return new Promise((res) => setTimeout(() => res(newTask), 300))
}
export const toggleTask = async (id: string): Promise<void> => {
    tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
}

export const deleteTask = async (id: string): Promise<void> => {
    tasks = tasks.filter(t => t.id !== id)
}
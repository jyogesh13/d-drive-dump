import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createTask, deleteTask, getTasks, toggleTask } from "../api/taskApi"

export const useTasks = () => {
    return useQuery({
        queryKey: ["tasks"],
        queryFn: getTasks
    })
}

export const useCreateTask = () => {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: createTask,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["tasks"] })
        }
    })
}

export const useToggleTask = () => {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: toggleTask,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["tasks"] })
        }
    })
}

export const useDeleteTask = () => {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: deleteTask,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["tasks"] })
        },
        onError: (error) => {
            if (error instanceof Error) {
                return error.message
            }
            return error
        }
    })
}
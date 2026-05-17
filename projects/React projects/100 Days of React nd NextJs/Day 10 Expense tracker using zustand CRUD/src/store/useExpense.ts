import { create } from "zustand";
import { persist } from "zustand/middleware";

type expenseType = {
    key: string;
    title: string;
    description: string;
    amount: number;
    date: string;
}

interface PersistType {
    expenses: expenseType[],
    addExpense: (payload: expenseType) => void,
    removeExpense: (key: string) => void,
    editExpense: (key: string, updateExpense: Partial<expenseType>) => void,
}

export const useExpense = create(persist<PersistType>((set) => ({
    expenses: [],
    addExpense: (payload) => set((state) => ({
        expenses: [...state.expenses, payload]
    })),
    removeExpense: (key) => set((state) => ({
        expenses: state.expenses.filter(item => item.key !== key)
    })),
    editExpense: (key, updateExpense) => set((state) => ({
        expenses: state.expenses.map(item => item.key === key ? { ...item, ...updateExpense } : item)
    }))
}), { name: "expenses" }))
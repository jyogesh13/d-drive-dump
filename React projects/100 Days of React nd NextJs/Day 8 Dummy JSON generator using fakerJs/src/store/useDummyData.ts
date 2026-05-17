
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { generateEmployee, generatePayments, generateProducts, generateUser } from "../lib/data";

type User = ReturnType<typeof generateUser>;
type Product = ReturnType<typeof generateProducts>;
type Payment = ReturnType<typeof generatePayments>;
type Employee = ReturnType<typeof generateEmployee>;

type PayloadType = User | Product | Payment | Employee

interface PersistType {
    payload: PayloadType[];
    setPayload: (data: PayloadType[]) => void;
}

export const useDummyData = create(persist<PersistType>(set => ({
    payload: [],
    setPayload: (data) => set({
        payload: data
    })
}), { name: "dummyData" }))
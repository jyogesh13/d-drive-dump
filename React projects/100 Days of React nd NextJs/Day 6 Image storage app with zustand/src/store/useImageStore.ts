import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PayloadType {
    id: string,
    name: string,
    size: number,
    binary: string | ArrayBuffer | null,
    createdAt: number,
}

type persistType = {
    images: PayloadType[],
    setImage: (payload: PayloadType) => void;
    deleteImage: (id: string) => void;
}


export const useImageStore = create(persist<persistType>((set) => (
    {
        images: [],
        setImage: (payload) => set((state) => ({
            images: [...state.images, payload]
        })),
        deleteImage: (id) => set((state) => ({
            images: state.images.filter((item) => item.id !== id)
        }))
    }
), { name: "image-store" }
))
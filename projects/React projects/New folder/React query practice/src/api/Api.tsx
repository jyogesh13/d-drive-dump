import axios from "axios";
import type { FetchPost } from "../types/fetchPost";

const baseURL = "https://jsonplaceholder.typicode.com";

const api = axios.create({
  baseURL,
});

export const fetchPost = () => {
  return api.get("/todos");
};

// to fetch data
export const fetchPosts = async ({ start = 0, limit = 0 }: FetchPost) => {
  try {
    const res = await api.get(`/todos?_start=${start}&_limit=${limit}`);
    if (res.status === 200) return res.data;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
    return error;
  }
};

export const fetchTodoById = async (id: string) => {
  try {
    const res = await api.get(`/todos/${id}`);
    if (res.status === 200) return res.data;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
    return error;
  }
};

export const deletePost = (id: number) => {
  return api.delete(`todos/${id}`);
};
export const updatePost =  (id: number) => {
  return api.patch(`todos/${id}`, { title: "I am updated" });
};

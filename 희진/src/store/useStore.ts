import { create } from "zustand";

type Store = {
  id: string;
  password: string;
  user: { id: string; password: string }[];
  setId: (id: string) => void;
  setPassword: (password: string) => void;
  addUser: (id: string, password: string) => void;
};

export const useStore = create<Store>((set) => ({
  id: "",
  password: "",
  user: [],
  setId: (id: string) => set({ id }),
  setPassword: (password: string) => set({ password }),
  addUser: (id: string, password: string) =>
    set((state) => ({ user: [...state.user, { id, password }] })),
}));

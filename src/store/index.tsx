import { create } from "zustand";
import { ExpenseStore } from "../types/expenseStore";

export const useGetExpenses = create<ExpenseStore>()((set) => ({
  expenses: [],
  setExpenses: (data) => set({ expenses: data }),
}));

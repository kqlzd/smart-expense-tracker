import { useEffect } from "react";
import { useGetExpenses } from "../store";
import { STORAGE_KEY } from "../consts/consts";

export const useLocalStorage = () => {
  const { expenses, setExpenses } = useGetExpenses();

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setExpenses(data);
      } catch (error) {
        console.error("localStorage parse error:", error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (expenses.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    }
  }, [expenses]);
};

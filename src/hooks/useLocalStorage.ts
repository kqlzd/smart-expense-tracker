/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useGetExpenses } from "../store";
import { GOALS_KEY, STORAGE_KEY } from "../consts/consts";

export const useLocalStorage = () => {
  const { expenses, setExpenses, goals, setGoals } = useGetExpenses();

  useEffect(() => {
    const savedExpenses = localStorage.getItem(STORAGE_KEY);
    if (savedExpenses) {
      try {
        setExpenses(JSON.parse(savedExpenses));
      } catch {}
    }

    const savedGoals = localStorage.getItem(GOALS_KEY);
    if (savedGoals) {
      try {
        setGoals(JSON.parse(savedGoals));
      } catch {}
    }
  }, []);

  useEffect(() => {
    if (expenses.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
      localStorage.setItem(GOALS_KEY, JSON.stringify(goals));
    }
  }, [expenses, goals]);
};

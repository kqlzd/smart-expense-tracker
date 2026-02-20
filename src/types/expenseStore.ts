interface Expense {
  id: number;
  amount: number;
  description: string;
  category: string;
  date: string;
}

interface Goal {
  id: number;
  category: string;
  limit: number;
}

export interface ExpenseStore {
  expenses: Expense[];
  goals: Goal[];
  setGoals: (data: Goal[]) => void;
  setExpenses: (data: Expense[]) => void;
}

interface Expense {
  id: number;
  amount: number;
  description: string;
  category: string;
  date: string;
}

export interface ExpenseStore {
  expenses: Expense[];
  setExpenses: (data: Expense[]) => void;
}

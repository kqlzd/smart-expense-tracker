import { RouteObject } from "react-router-dom";

import { HomePage } from "../pages/HomePage/HomePage";
import { Analytics } from "../pages/Analytics/Analytics";
import { Expense } from "../pages/Expenses/Expense";
import { StatsCards } from "../components/StatsCards/StatsCards";

export const ExpenseRoutes: RouteObject[] = [
  {
    path: "/",
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "expenses",
        element: <Expense />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
      {
        path: "stats",
        element: <StatsCards />,
      },
    ],
  },
];

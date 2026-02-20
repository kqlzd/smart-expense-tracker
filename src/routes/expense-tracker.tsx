import { RouteObject } from "react-router-dom";
import { HomePage, Expense, Analytics, StatsCards } from ".";
import { Layout } from "../components/Layout/Layout";
import { CsvExport } from "../pages/CsvExport/CsvExport";

export const ExpenseRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
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
      {
        path: "csv",
        element: <CsvExport />,
      },
    ],
  },
];

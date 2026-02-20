import { Expense } from "../types/models";

export const exportToCSV = (expenses: Expense[]) => {
  if (expenses.length === 0) {
    console.log("Xərc yoxdur!");
    return;
  }

  const headers = ["ID", "Tarix", "Açıqlama", "Kateqoriya", "Məbləğ (₼)"];

  const rows = expenses.map((exp) => [
    exp.id,
    exp.date,
    exp.description,
    exp.category,
    exp.amount.toFixed(2),
  ]);

  const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `xercler-${new Date().toISOString().split("T")[0]}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};

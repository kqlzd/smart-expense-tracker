import { Button } from "@chakra-ui/react";
import React from "react";
import { exportToCSV } from "../../utils/exportCSV";
import { useGetExpenses } from "../../store";

export const CsvExport = () => {
  const { expenses } = useGetExpenses();

  return (
    <Button
      size="lg"
      colorScheme="green"
      variant="outline"
      onClick={() => exportToCSV(expenses)}
    >
      📥 CSV Export
    </Button>
  );
};

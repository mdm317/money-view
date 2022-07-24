import { useState, useEffect } from "react";
import { ExpensesItem, TotalExpensesItems } from "./../types";
type UseExpenseDataFilterProp = {
  totalExpensesItems?: TotalExpensesItems;
  selectedDate: string | null;
  tag?: string;
};
function useExpenseDataFilter({
  totalExpensesItems,
  selectedDate,
  tag,
}: UseExpenseDataFilterProp) {
  const [filteredExpenseData, setFilteredExpenseData] = useState<
    ExpensesItem[]
  >([]);
  useEffect(() => {
    if (totalExpensesItems && selectedDate) {
      if (tag) {
        const eds = totalExpensesItems[selectedDate];
        const newExpenseData = eds.filter((ed) => ed.tag === tag);
        setFilteredExpenseData(newExpenseData);
      }
    }
  }, [totalExpensesItems, selectedDate, tag]);

  return filteredExpenseData;
}

export default useExpenseDataFilter;

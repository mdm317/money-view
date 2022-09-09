import { useEffect, useState } from "react";
import { ExpensesItem } from "../../types";
import useWriteExpenses from "../react-query/mutations/useWriteExpenses";
import useExpenseDataFilter from "../useExpenseDataFilter";

export default function useExpenseTable(
  currentExpensesItems: ExpensesItem[],
  selectedDate: string
) {
  const [expensesItems, setexpensesItems] = useState(currentExpensesItems);
  useEffect(() => {
    setexpensesItems(currentExpensesItems);
  }, [currentExpensesItems]);

  const { mutateAsync } = useWriteExpenses("write-expense");
  const changeExpenseItemTag = (index: number, newTag: string) => {
    if (selectedDate) {
      expensesItems[index].tag = newTag;
      setexpensesItems([...expensesItems]);
    }
  };
  const changeExpenseItemSecondTag = (index: number, newTag: string) => {
    if (selectedDate) {
      expensesItems[index].secondTag = newTag;
      setexpensesItems([...expensesItems]);
    }
  };
  const deleteExpenseElem = (deleteIndex: number) => {
    const newExpensesItem = expensesItems.filter((_, i) => i !== deleteIndex);
    setexpensesItems(newExpensesItem);
  };
  const handleSave = () => {
    mutateAsync({
      selectedDate,
      expensesItem: expensesItems,
    }).then(() => alert("성공"));
  };
  return {
    expensesItems,
    changeExpenseItemTag,
    deleteExpenseElem,
    handleSave,
    changeExpenseItemSecondTag,
  };
}

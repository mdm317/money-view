import { useEffect, useState } from "react";
import useWriteExpenses from "../hooks/react-query/mutations/useWriteExpenses";
import { ExpensesItem } from "../types";
import DropDown from "./DropDown";

type ExpenseTableProp = {
  currentExpensesItems: ExpensesItem[];
  tagList: string[];
  selectedDate: string;
};
export default function ExpenseTable({
  currentExpensesItems,
  tagList,
  selectedDate,
}: ExpenseTableProp) {
  const [expensesItems, setexpensesItems] = useState(currentExpensesItems);
  useEffect(() => {
    setexpensesItems(currentExpensesItems);
  }, [currentExpensesItems]);
  const { mutateAsync } = useWriteExpenses("write-expense");
  const handleClickDropdown = (index: number, newTag: string) => {
    if (selectedDate) {
      expensesItems[index].tag = newTag;
      setexpensesItems([...expensesItems]);
    }
  };
  const deleteExpenseElem = (deleteIndex: number) => {
    console.log(deleteIndex);
    const newExpensesItem = expensesItems.filter((_, i) => i !== deleteIndex);
    setexpensesItems(newExpensesItem);
  };
  const handleSave = () => {
    mutateAsync({
      selectedDate,
      expensesItem: expensesItems,
    }).then(() => alert("성공"));
  };
  return (
    <div>
      <table className="mb-11 border-collapse table-auto w-full text-sm">
        <thead>
          <tr>
            {["date", "storename", "price", "tag", "changetag", "delete"].map(
              (key) => (
                <th
                  key={key}
                  className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left"
                >
                  {key}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {expensesItems.map((expensesItem, i) => (
            <tr key={i}>
              {[
                expensesItem.date,
                expensesItem.storename,
                expensesItem.price,
                expensesItem.tag,
              ].map((key) => (
                <td
                  key={key}
                  className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
                >
                  {key}
                </td>
              ))}
              <td>
                <DropDown
                  title="selecttag"
                  menus={tagList}
                  index={i}
                  onClick={handleClickDropdown}
                />
              </td>
              <td className="pl-9">
                <button onClick={() => deleteExpenseElem(i)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="sticky bottom-10 left-10">
        <button
          className="bg-sky-500 hover:bg-sky-700 px-10 py-5 text-5xl leading-5 rounded-full font-semibold text-white"
          onClick={handleSave}
        >
          SAVE
        </button>
      </div>
    </div>
  );
}

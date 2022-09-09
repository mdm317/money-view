import { useState } from "react";
import useTags from "../../../hooks/react-query/useTags";
import { ExpensesItem, ExpenseItemWithIndex } from "../../../types";
import DropDown from "../../DropDown";
import Modal from "../../Modal";

type ExpenseTableRowProp = {
  expensesItem: ExpensesItem;
  changeExpenseItemTag: (index: number, newTag: string) => void;
  changeExpenseItemSecondTag: (index: number, newTag: string) => void;
  deleteExpenseElem: (index: number) => void;
  index: number;
  setSelectedExpense: (v: ExpenseItemWithIndex) => void;
};
function ExpenseTableRow({
  expensesItem,
  changeExpenseItemTag,
  changeExpenseItemSecondTag,
  deleteExpenseElem,
  index,
  setSelectedExpense,
}: ExpenseTableRowProp) {
  const { data: tagList } = useTags();
  const handleClickRow = () => {
    if (document.body.clientWidth < 600) {
      setSelectedExpense({ index, ...expensesItem });
    }
  };
  if (!tagList) return <></>;
  return (
    <>
      <tr onClick={handleClickRow}>
        {[expensesItem.date, expensesItem.storename, expensesItem.price].map(
          (key) => (
            <td
              key={key}
              className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
            >
              {key}
            </td>
          )
        )}
        <td>
          <DropDown
            title="selecttag"
            value={expensesItem.tag}
            menus={tagList}
            index={index}
            onClick={changeExpenseItemTag}
          />
        </td>
        <td>
          <DropDown
            title="select second tag"
            value={expensesItem.secondTag}
            menus={tagList}
            index={index}
            onClick={changeExpenseItemSecondTag}
          />
        </td>
        <td className="pl-9">
          <button onClick={() => deleteExpenseElem(index)}>❌</button>
        </td>
      </tr>
    </>
  );
}

export default ExpenseTableRow;

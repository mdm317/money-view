import { useEffect, useState } from "react";
import { expenseTableHeaders } from "../../../const/edit/expenseTableConst";
import useExpenseTable from "../../../hooks/edit/useExpense";
import useTags from "../../../hooks/react-query/useTags";
import { ExpenseItemWithIndex, ExpensesItem } from "../../../types";
import DropDown from "../../DropDown";
import Modal from "../../Modal";
import TagDropDown from "../../TagDropDown";
import ExpenseTableRow from "./ExpenseTableRow";

type ExpenseTableProp = {
  currentExpensesItems: ExpensesItem[];
  selectedDate: string;
};
export default function ExpenseTable({
  currentExpensesItems,
  selectedDate,
}: ExpenseTableProp) {
  const {
    expensesItems,
    changeExpenseItemTag,
    changeExpenseItemSecondTag,
    deleteExpenseElem,
    handleSave,
  } = useExpenseTable(currentExpensesItems, selectedDate);

  //only mobile
  const [selectedExpense, setSelectedExpense] =
    useState<null | ExpenseItemWithIndex>(null);

  return (
    <div>
      {selectedExpense && (
        <Modal
          visible={selectedExpense !== null}
          setVisible={(visible: boolean) => {
            if (!visible) {
              setSelectedExpense(null);
            }
          }}
        >
          <div className="relative p-3 w-[80vw] h-[80vh]">
            <svg
              onClick={() => {
                const selectedIndex = selectedExpense.index;
                const preExpenseItem = expensesItems[selectedIndex - 1];
                setSelectedExpense({
                  ...preExpenseItem,
                  index: selectedIndex - 1,
                });
              }}
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill="currentColor"
              className={`${
                selectedExpense.index === 0 ? "hidden" : ""
              } absolute top-20 left-[-30px] bi bi-chevron-left`}
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill="currentColor"
              className={`${
                selectedExpense.index === expensesItems.length - 1
                  ? "hidden"
                  : ""
              } absolute top-20 right-[-10px] bi bi-chevron-right`}
              viewBox="0 0 16 16"
              onClick={() => {
                const selectedIndex = selectedExpense.index;
                const nxtExpenseItem = expensesItems[selectedIndex + 1];
                setSelectedExpense({
                  ...nxtExpenseItem,
                  index: selectedIndex + 1,
                });
              }}
            >
              <path
                fill-rule="evenodd"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
              />
            </svg>

            <h1 className="m-5">{selectedExpense.date}</h1>
            <div className="flex items-center justify-between h-14 pr-3">
              <div className="text-slate-500">store name</div>
              <div>{selectedExpense.storename}</div>
            </div>
            <div className="flex items-center justify-between h-14 pr-3">
              <div className="text-slate-500">price</div>
              <div>{selectedExpense.price}</div>
            </div>
            <div className="flex items-center justify-between h-14 pr-3">
              <div className="text-slate-500">tag</div>
              <TagDropDown
                title="selecttag"
                value={selectedExpense.tag}
                index={selectedExpense.index}
                onClick={changeExpenseItemTag}
              />
            </div>
            <div className="flex items-center justify-between h-14 pr-3">
              <div className="text-slate-500">tag 2</div>
              <TagDropDown
                title="selecttag"
                value={selectedExpense.secondTag}
                index={selectedExpense.index}
                onClick={changeExpenseItemSecondTag}
              />
            </div>
          </div>
          {/* <div>
            <h3>{expensesItem.date}</h3>
            <table>
              <tbody>
                <tr>
                  <td>금액</td>
                  <td>{expensesItem.price}</td>
                </tr>
              </tbody>
            </table>
          </div> */}
        </Modal>
      )}
      <table className="mb-11 border-collapse table-auto w-full text-sm">
        <thead>
          <tr>
            {expenseTableHeaders.map((key) => (
              <th
                key={key}
                className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left"
              >
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {expensesItems.map((expensesItem, i) => (
            <ExpenseTableRow
              key={i}
              changeExpenseItemTag={changeExpenseItemTag}
              changeExpenseItemSecondTag={changeExpenseItemSecondTag}
              deleteExpenseElem={deleteExpenseElem}
              expensesItem={expensesItem}
              setSelectedExpense={setSelectedExpense}
              index={i}
            />
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

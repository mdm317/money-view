import { useState } from "react";
import EditTag from "../Component/Edit/EditTag";
import ExpenseTable from "../Component/Edit/ExpenseTable";
import useExpenses from "../hooks/react-query/useExpenses";
import useTags from "../hooks/react-query/useTags";

function EditExpenses() {
  const { data: totalExpensesItems } = useExpenses();
  const { data: tagList } = useTags();

  const [selectedDate, setSelectedDate] = useState<null | string>(null);

  const dates = totalExpensesItems ? Object.keys(totalExpensesItems) : [];

  return (
    <>
      <button
        className="bg-sky-500 hover:bg-sky-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white"
        onClick={() => setSelectedDate("tag")}
      >
        tag
      </button>
      {dates.map((date) => (
        <button
          key={date}
          className="bg-sky-500 hover:bg-sky-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white"
          onClick={() => setSelectedDate(date)}
        >
          {date}
        </button>
      ))}

      {selectedDate === null ? (
        <></>
      ) : selectedDate === "tag" ? (
        <EditTag />
      ) : (
        <>
          {totalExpensesItems && tagList && (
            <ExpenseTable
              currentExpensesItems={totalExpensesItems[selectedDate]}
              selectedDate={selectedDate}
            />
          )}
        </>
      )}
    </>
  );
}

export default EditExpenses;

import { useState } from "react";
import useWriteExpenses from "../hooks/react-query/mutations/useWriteExpenses";
import { useUser } from "../UserContext";
import { priceStringToNumber } from "../utils";
import { ExpensesItem } from "../types";

function UploadMoney() {
  const [value, setValue] = useState("");
  const { user } = useUser();
  const { mutateAsync } = useWriteExpenses("write-expense");

  const handleSubmit = () => {
    if (!user) return;
    const tableElem = document.createElement("table");
    const newValue = value;
    // const newValue = value;
    let keydate = "";
    tableElem.innerHTML = newValue;
    const trs = tableElem.querySelectorAll("tr");
    const items = [...trs].reduce((ac: ExpensesItem[], tr, i) => {
      if (i === 0) return ac;
      const tem = tr.querySelectorAll("td");
      const date = tem[1].innerText.trim();
      keydate = date.substring(0, 7).replace(".", "");
      const storename = tem[3].innerText;
      const price = priceStringToNumber(tem[4].innerText);
      ac.push({
        price,
        storename,
        tag: "",
        date,
      });
      return ac;
    }, []);

    if (items.length === 0 || keydate === "") {
      return alert("wrong format");
    }
    mutateAsync({
      selectedDate: keydate,
      expensesItem: items,
    });
  };
  return (
    <div>
      <textarea
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
        placeholder="Search for anything..."
        name="search"
      />
      <button onClick={handleSubmit}>submit</button>
    </div>
  );
}

export default UploadMoney;

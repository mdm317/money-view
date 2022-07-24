import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import useExpenses from "../hooks/react-query/useExpenses";
import { expenseData2chartData, numberToKoreaMoneyFormat } from "../utils";
import { makeOption, moneyPieChartTitle } from "../utils/chart";
import { ChartData } from "../types";
import useExpenseDataFilter from "../hooks/useExpenseDataFilter";
import ExpenseTable from "../Component/ExpenseTable";
import useTags from "../hooks/react-query/useTags";

function PieChartMoney() {
  const divRef = useRef(null);

  const { data: tagList } = useTags();

  const [selectedTag, setSelectedTag] = useState("");
  const { data: totalExpensesItems } = useExpenses();
  const [selectedDate, setSelectedDate] = useState<null | string>(null);
  const filteredExpenseData = useExpenseDataFilter({
    totalExpensesItems,
    selectedDate,
    tag: selectedTag,
  });
  useEffect(() => {
    if (divRef.current && totalExpensesItems && selectedDate) {
      var myChart = echarts.init(divRef.current);
      const chartData = expenseData2chartData(totalExpensesItems[selectedDate]);
      myChart.setOption(makeOption(chartData));
      myChart.on("click", function (params) {
        const data = params.data as ChartData;
        const name = data.name;
        setSelectedTag(name);
      });
      myChart.on("legendselectchanged", (event: any) => {
        const totalSelectedMoney = chartData.reduce((ac, cu) => {
          if (event.selected[cu.name] === true) {
            return ac + cu.value;
          } else {
            return ac;
          }
        }, 0);

        myChart.setOption({
          title: [
            moneyPieChartTitle,
            {
              text: numberToKoreaMoneyFormat(totalSelectedMoney),
              left: "center",
              top: "10%",
            },
          ],
        });
      });
    }
  }, [divRef, totalExpensesItems, selectedDate]);

  if (!totalExpensesItems) {
    return <></>;
  }
  const dates = Object.keys(totalExpensesItems);

  return (
    <>
      {dates.map((date) => (
        <button
          key={date}
          className="bg-sky-500 hover:bg-sky-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white"
          onClick={() => setSelectedDate(date)}
        >
          {date}
        </button>
      ))}
      <div className="min-h-[600px] w-full" ref={divRef}></div>
      {filteredExpenseData.length !== 0 && selectedDate && tagList && (
        <ExpenseTable
          currentExpensesItems={filteredExpenseData}
          selectedDate={selectedDate}
          tagList={tagList}
        />
      )}
    </>
  );
}

export default PieChartMoney;

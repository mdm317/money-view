import { ExpensesItem, ChartData } from "./../types";
export const priceStringToNumber = (price: string) => {
  return parseInt(price.trim().replace(",", ""));
};

type accType = {
  [key: string]: number;
};
export const expenseData2chartData = (
  expenseData: ExpensesItem[]
): ChartData[] => {
  const chartData: accType = expenseData
    .map((ed) => {
      if (ed.tag === "") {
        return {
          ...ed,
          tag: "없음",
        };
      } else {
        return ed;
      }
    })
    .reduce((acc: any, cur: ExpensesItem) => {
      if (acc[cur.tag]) {
        acc[cur.tag] += cur.price;
      } else {
        acc[cur.tag] = cur.price;
      }
      return acc;
    }, {});
  return Object.keys(chartData).map((key) => ({
    value: chartData[key],
    name: key,
  }));
};

export const numberToKoreaMoneyFormat = (money: number): string => {
  return money.toLocaleString("ko-KR", { style: "currency", currency: "KRW" });
};

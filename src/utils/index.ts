import { myColors } from "./../const/color";
import { ExpensesItem, ChartData } from "./../types";
export const priceStringToNumber = (price: string) => {
  return parseInt(price.trim().replace(",", ""));
};

type accType = {
  [key: string]: number;
};
type ChartGroupData = {
  [key: string]: { value: number; groupId?: string; name: string }[];
};

export const expenseData2chartData = (
  expenseData: ExpensesItem[]
): [ChartData[], ChartGroupData] => {
  const chartData1: accType = expenseData
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
    .reduce((ac: any, cur: ExpensesItem) => {
      if (ac[cur.tag]) {
        ac[cur.tag] += cur.price;
      } else {
        ac[cur.tag] = cur.price;
      }

      return ac;
    }, {});

  const groupData: ChartGroupData = expenseData
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
    .reduce((ac: ChartGroupData, cur: ExpensesItem) => {
      if (ac[cur.tag]) {
        const key = cur.secondTag ? cur.secondTag : "분류안됨";
        const idx = ac[cur.tag].findIndex(
          (groupdatas) => groupdatas.name === key
        );
        if (idx === -1) {
          ac[cur.tag].push({
            value: cur.price,
            name: key,
          });
        } else {
          ac[cur.tag][idx].value += cur.price;
        }
      } else {
        ac[cur.tag] = [];
      }

      return ac;
    }, {});
  const chartData1Arr = Object.keys(chartData1).map((key) => ({
    value: chartData1[key],
    name: key,
  }));
  return [chartData1Arr, groupData];
};

export const numberToKoreaMoneyFormat = (money: number): string => {
  return money.toLocaleString("ko-KR", { style: "currency", currency: "KRW" });
};

export const colorPicker = (index: number | undefined) => {
  //see tailwind css config
  const colorLength = myColors.length;
  if (index === undefined) {
    return myColors[colorLength - 1];
  }
  if (index > colorLength - 1) {
    return myColors[index % colorLength];
  }
  return myColors[index];
};

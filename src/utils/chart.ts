import * as echarts from "echarts";
import { numberToKoreaMoneyFormat } from ".";
import { ChartData } from "../types";

export const moneyPieChartTitle = {
  text: "쓴 돈",
  left: "center",
};
export const makeOption = (data: ChartData[]) => {
  const option: echarts.EChartsCoreOption = {
    title: [
      moneyPieChartTitle,
      {
        text: numberToKoreaMoneyFormat(
          data.reduce((ac, cu) => ac + cu.value, 0)
        ),
        left: "center",
        top: "10%",
      },
    ],
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: "50%",
        data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
  return option;
};

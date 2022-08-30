import * as echarts from "echarts";
import { numberToKoreaMoneyFormat } from ".";
import { ChartData } from "../types";

export const moneyPieChartTitle = {
  text: "쓴 돈",
  left: "center",
};
type Tem = {
  back: () => void;
};
export const makeOption = (data: ChartData[], opt?: Tem) => {
  const option: echarts.EChartsCoreOption = {
    title: [
      moneyPieChartTitle,
      {
        text: numberToKoreaMoneyFormat(
          data.reduce((ac, cu) => ac + cu.value, 0)
        ),
        left: "center",
        top: "5%",
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
    universalTransition: {
      enabled: true,
      divideShape: "clone",
    },

    graphic: opt?.back
      ? [
          {
            type: "text",
            left: "center",
            top: 60,
            style: {
              text: "Back",
              fontSize: 18,
            },
            onclick: function () {
              opt.back();
            },
          },
        ]
      : [
          {
            type: "text",
            left: "center",
            top: 60,
            style: {
              text: "Back",
              fontSize: 0,
            },
          },
        ],
  };
  console.log("dd", option.graphic);
  return option;
};

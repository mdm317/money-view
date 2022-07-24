export type TotalExpensesItems = {
  [key: string]: ExpensesItem[];
};
export type ExpensesItem = {
  price: number;
  storename: string;
  tag: string;
  date: string;
};

export type ChartData = {
  value: number;
  name: string;
};

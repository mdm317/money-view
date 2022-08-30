export type TotalExpensesItems = {
  [key: string]: ExpensesItem[];
};
export type ExpensesItem = {
  price: number;
  storename: string;
  tag: string;
  date: string;
  secondTag?: string;
};

export type ChartData = {
  value: number;
  groupId?: string;
  name: string;
};

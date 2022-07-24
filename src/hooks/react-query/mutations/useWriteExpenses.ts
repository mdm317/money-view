import { ExpensesItem } from "./../../../types";
import { useMutation, useQueryClient } from "react-query";
import { setTags, writeExpensesData } from "../../../firebase/realtimeDB";
import { useUser } from "./../../../UserContext";
export default function useWriteExpenses(key: string) {
  const { user } = useUser();

  const queryClient = useQueryClient();
  return useMutation(
    async ({
      selectedDate,
      expensesItem,
    }: {
      selectedDate: string;
      expensesItem: ExpensesItem[];
    }) => {
      if (user) {
        await writeExpensesData(user.uid, selectedDate, expensesItem);
      }
    },
    {
      mutationKey: key,
      onSuccess: () => {
        queryClient.invalidateQueries([user?.uid, "expense"], {
          refetchActive: true,
          refetchInactive: false,
        });
      },
    }
  );
}

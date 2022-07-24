import { useQuery } from "react-query";
import { getExpensesData } from "../../firebase/realtimeDB";
import { TotalExpensesItems } from "../../types";
import { useUser } from "../../UserContext";

function useExpenses() {
  const { user } = useUser();
  const userOid = user?.uid;
  const { data, isLoading } = useQuery<TotalExpensesItems>(
    [userOid, "expense"],
    getExpensesData,
    {
      enabled: !!userOid,
      staleTime: 60 * 1000 * 1000 * 1000,
    }
  );

  return { data, isLoading };
}

export default useExpenses;

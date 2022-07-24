import React from "react";
import { useQuery } from "react-query";
import { getExpensesData, getTags } from "../../firebase/realtimeDB";
import { useUser } from "../../UserContext";

function useExpenses() {
  const { user } = useUser();
  const userOid = user?.uid;
  return useQuery([userOid, "tag"], getTags, {
    enabled: !!userOid,
    staleTime: 60 * 1000 * 1000 * 1000,
  });
}

export default useExpenses;

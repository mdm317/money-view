import { useMutation, useQueryClient } from "react-query";
import { setTags } from "../../../firebase/realtimeDB";
import { useUser } from "../../../UserContext";
export default function useWriteTag(key: string) {
  const { user } = useUser();

  const queryClient = useQueryClient();
  return useMutation(
    async (tagList: string[]) => {
      if (user) {
        await setTags(user.uid, tagList);
      }
    },
    {
      mutationKey: [key],
      onSuccess: () => {
        queryClient.invalidateQueries([user?.uid, "tag"], {
          refetchActive: true,
          refetchInactive: false,
        });
      },
    }
  );
}

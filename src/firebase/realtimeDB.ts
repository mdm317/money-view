import { getDatabase, ref, set, get, child } from "firebase/database";
import app from "./firebaseApp";
const db = getDatabase(app);

export async function writeExpensesData(
  userId: string,
  keydate: string,
  data: any[]
) {
  const db = getDatabase();
  await set(ref(db, `users/` + userId + "/expenses/" + keydate), data);
  return;
}
export async function getExpensesData(queryContext: any) {
  const userOid = queryContext.queryKey[0];
  const dbRef = ref(getDatabase());
  const data = await get(child(dbRef, `users/` + userOid + "/expenses"));
  if (data.exists()) {
    return data.val();
  }
  return {};
}
export async function getTags(queryContext: any) {
  const userOid = queryContext.queryKey[0];
  const dbRef = ref(getDatabase());
  const data = await get(child(dbRef, `users/${userOid}/tag`));
  console.log({ data });
  if (data.exists()) {
    return data.val();
  }
  return [];
}
export async function setTags(userOid: string, tags: string[]) {
  const db = getDatabase();
  await set(ref(db, `users/` + userOid + "/tag"), tags);
}

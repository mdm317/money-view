import { useState } from "react";
import Loading from "../Component/Loading";
import useExpenses from "../hooks/react-query/useExpenses";
import { useUser } from "../UserContext";

function CallenderMoney() {
  const { user } = useUser();
  const { data } = useExpenses();
  const [load, setLoad] = useState(false);
  return (
    <>
      <button onClick={() => setLoad(!load)}>hello</button>
      <Loading loading={load}>
        <div className="w-screen h-screen">CallenderMoney</div>
      </Loading>
    </>
  );
}

export default CallenderMoney;

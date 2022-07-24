import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import { getAuth, onAuthStateChanged, User } from "firebase/auth";

const UserContext = createContext<{
  user: User | null | undefined;
}>({
  user: null,
});
export const useUser = () => {
  return useContext(UserContext);
};

export default function UserProvider({ children }: any) {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log("sdf", { user });
        setUser(user);
        // ...
      } else {
        // User is signed out
        // ...
        console.log("sdf", { user });

        setUser(null);
      }
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

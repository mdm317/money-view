import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
const provider = new GoogleAuthProvider();

export const signInwithGoogle = async () => {
  const auth = getAuth();
  return await signInWithPopup(auth, provider);
};
export const signOutWithGoogle = async () => {
  const auth = getAuth();

  return await signOut(auth);
};

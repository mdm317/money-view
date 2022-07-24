import { initializeApp } from "firebase/app";
// Follow this pattern to import other Firebase services
const {
  VITE_apiKey,
  VITE_authDomain,
  VITE_databaseURL,
  VITE_projectId,
  VITE_storageBucket,
  VITE_messagingSenderId,
  VITE_appId,
} = import.meta.env;
const firebaseConfig = {
  apiKey: VITE_apiKey,
  authDomain: VITE_authDomain,
  databaseURL: VITE_databaseURL,
  projectId: VITE_projectId,
  storageBucket: VITE_storageBucket,
  messagingSenderId: VITE_messagingSenderId,
  appId: VITE_appId,
};

const app = initializeApp(firebaseConfig);

export default app;

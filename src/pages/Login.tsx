import { signInwithGoogle, signOutWithGoogle } from "../firebase/auth";

function Login() {
  return (
    <>
      <button
        className={`bg-sky-500  dropdown-toggle px-6 py-2.5  text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg active:text-white transition duration-150 ease-in-out flex items-center whitespace-nowrap `}
        onClick={() => {
          signInwithGoogle();
        }}
      >
        Login
      </button>
      <button
        className={`bg-sky-500  dropdown-toggle px-6 py-2.5  text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg active:text-white transition duration-150 ease-in-out flex items-center whitespace-nowrap `}
        onClick={() => {
          signOutWithGoogle();
        }}
      >
        log out
      </button>
    </>
  );
}

export default Login;

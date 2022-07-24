import { signInwithGoogle, signOutWithGoogle } from "../firebase/auth";

function Login() {
  return (
    <>
      <div
        onClick={() => {
          signInwithGoogle();
        }}
      >
        Login
      </div>
      <button
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

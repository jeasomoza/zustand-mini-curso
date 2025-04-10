import { FormEvent } from "react";
import { useAuthStore } from "../../stores";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

export const LoginPage = () => {
  const logginUser = useAuthStore((state) => state.loginUser);

  const navigate = useNavigate();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { username, password, remember } =
      event.target as typeof event.target & {
        username: { value: string };
        password: { value: string };
        remember: { checked: boolean };
      };
    console.log(username.value, password.value, remember.checked);

    try {
      await logginUser(username.value, password.value);
      navigate("/dashboard");
    } catch (e) {
      console.log(e);
      if (e instanceof Error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: e.message || "Ocurrió un error inesperado.",
        });
      } else {
        // Manejo de casos donde 'e' no es una instancia de Error.
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrió un error desconocido.",
        });
      }
    }
  };

  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">Login</h1>

      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-600">Email</label>
          <input type="text" name="username" autoComplete="off" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600">Password</label>
          <input type="password" name="password" autoComplete="off" />
        </div>

        <div className="mb-4 flex items-center">
          <input type="checkbox" name="remember" className="text-blue-500" />
          <label className="text-gray-600 ml-2">Remember Me</label>
        </div>

        <div className="mb-6 text-blue-500">
          <a href="#" className="hover:underline">
            Forgot Password?
          </a>
        </div>

        <button type="submit" className="bg-indigo-600">
          Login
        </button>
      </form>
      <div className="mt-6 text-blue-500 text-center">
        <a href="#" className="hover:underline">
          Sign up Here
        </a>
      </div>
    </>
  );
};

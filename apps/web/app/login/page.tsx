"use client";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import API from "../lib/axios";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    setError("");
    try {
      const res = await API.post("/users/login", formData);
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // ✅ Redirect to dashboard
      router.push("/dashboard");
    } catch (err: any) {
      if (err.response?.status === 400) {
        const zodErrors = err.response.data.error;
        const messages = zodErrors.map(
          (e: any) => `${e.path[0]}: ${e.message}`
        );
        setError(messages.join("\n"));
      } else if (err.response?.status === 401) {
        setError("Invalid email or password");
      } else {
        setError("Login failed");
      }
    }
  };

  return (
    <div className="flex justify-center">
      <div className="h-screen flex flex-col justify-center w-80 sm:w-96">
        <h1 className="font-bold text-2xl mb-5">Login</h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm whitespace-pre-line">
            {error}
          </div>
        )}

        <div className="flex flex-col my-2">
          <span className="text-sm font-bold">Email</span>
          <input
            name="email"
            type="email"
            onChange={handleChange}
            placeholder="user@example.com"
            className="py-2 px-3 rounded-md border"
          />
        </div>

        <div className="flex flex-col my-2">
          <span className="text-sm font-bold">Password</span>
          <input
            name="password"
            type="password"
            onChange={handleChange}
            placeholder="Password"
            className="py-2 px-3 rounded-md border"
          />
        </div>

        <button
          onClick={handleLogin}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded mt-4"
        >
          Login
        </button>

        <p className="mt-4 text-sm text-center">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
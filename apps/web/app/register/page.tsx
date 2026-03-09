"use client";
import{ AuthResponse} from '../types'
import { ChangeEvent, useState } from 'react';
import {useRouter}  from "next/navigation"
import axios from 'axios';

interface RegisterData {
    name: string,
    email: string,
    password: string,
    confirmPassword: string;
}
const Register = () => {
    const router = useRouter();
    const [formData, setFormData] = useState<RegisterData>({
        email: "",
        name: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState("")
    console.log(formData.password)
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }
    const handleRegister = async () => {
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            const response = await axios.post<AuthResponse>("http://localhost:4000/users/register", formData)
            const {token, user} = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem("user",JSON.stringify(user))

            console.log("Registered user :", user)
            alert('signup in successfully')
            router.push("/dashboard")
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
    return <>
        <div className="flex justify-center ">
            <div className="h-screen item-center flex flex-col justify-center w-50 sm:w-90 ">
                <h1 className="font-bold text-2xl mb-5 flex juftify-center item-center">Create your account </h1>
                <div className="flex flex-col my-2">
                    <span className="text-sm font-bold">Name</span>
                    <input
                    name = "name"
                        type="name"
                        onChange={handleChange}
                        placeholder='John Doe'
                        className="py-2 rounded-md "
                    />
                    <div className="flex flex-col my-2">
                        <span className="text-sm font-bold">Email</span>
                        <input
                        name='email'
                            type="email"
                            onChange={handleChange}
                            placeholder="User Email"
                            className="py-2 rounded-md" />

                    </div>
                    <div className="flex flex-col my-2"> <span className="text-sm font-bold">Password</span>
                        <input
                        name = "password"
                            type="password"
                            onChange={handleChange}
                            placeholder="User Email"
                            className="py-2 rounded-md"
                        />
                    </div><div className="flex flex-col my-2"><span className="text-sm font-bold">Conform Password</span>
                        <input
                        name = "confirmPassword"
                            type="password"
                            onChange={handleChange}
                            placeholder="User Email"
                            className="py-2 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col my-2">
                        <button onClick={handleRegister} className="bg-blue-300 rounded-sm transition:transform hover:bg-blue-500 text-blue font-bold py-2">sign in</button>
                    </div>

        <p className="mt-4 text-sm text-center">
          already have an account?{" "}
          <a href="/login" className="text-blue-500 underline">
            Login here
          </a>
        </p>

                </div>
            </div>
        </div>

    </>
}

export default Register;
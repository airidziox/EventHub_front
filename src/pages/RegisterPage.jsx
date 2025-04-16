import React, {useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import http from "../plugins/https.jsx"
import validator from "email-validator";

const RegisterPage = () => {

    const navigate = useNavigate()

    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordOneRef = useRef();
    const passwordTwoRef = useRef();

    const [errors, setErrors] = useState({});

    function validate() {
        const newErrors = {};

        const username = usernameRef.current.value.trim();
        const email = emailRef.current.value.trim();
        const passwordOne = passwordOneRef.current.value;
        const passwordTwo = passwordTwoRef.current.value;

        if (!username) {
            newErrors.username = "Username is required.";
        } else if (username.length < 4 || username.length > 20) {
            newErrors.username = "Username must be 4 - 20 symbols long.";
        }

        if (!email) {
            newErrors.email = "Email is required.";
        } else if (!validator.validate(email)) {
            newErrors.email = "Email is invalid.";
        }

        if (!passwordOne) {
            newErrors.passwordOne = "Password is required.";
        } else if (passwordOne.length < 4 || passwordOne.length > 20) {
            newErrors.passwordOne = "Password must be 4 - 20 symbols long.";
        }

        if (!passwordTwo) {
            newErrors.passwordTwo = "Confirm password is required.";
        } else if (passwordOne !== passwordTwo) {
            newErrors.passwordTwo = "Passwords do not match.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function register() {
        if (!validate()) return;

        const myUser = {
            username: usernameRef.current.value,
            email: emailRef.current.value,
            passwordOne: passwordOneRef.current.value,
            passwordTwo: passwordTwoRef.current.value
        }

        const res = await http.post("http://localhost:2001/register", myUser)

        if (res.error) {
            const newErrors = {};
            console.log(res)
            if(res.message === "Username is taken.") {
                newErrors.username = res.message;
            }
            if(res.message === "Email is taken.") {
                newErrors.email = res.message;
            }
            return setErrors(newErrors);
        } else {
            navigate("/")
            console.log(res)
        }
    }

    return (
            <div
                className="relative mx-auto w-full max-w-md bg-white mt-10 px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
                <div className="w-full">
                    <div className="text-center">
                        <h1 className="text-3xl font-semibold text-gray-900">Sign up</h1>
                        <p className="mt-2 text-gray-500">Sign up below to create your account.</p>
                    </div>
                    <div className="mt-5">
                        <div>

                            <div className="relative mt-6">
                                <input type="text" placeholder="Username" ref={usernameRef}
                                       className={`peer mt-1 w-full border-b-2 ${errors.username ? "border-rose-500" : "border-gray-300"} px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none`}/>
                                <label
                                    className="absolute pointer-events-none top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Username</label>
                            </div>

                            {errors.username && (
                                <p className="mt-1 text-sm text-rose-500">{errors.username}</p>
                            )}

                            <div className="relative mt-6">
                                <input type="email" placeholder="Email Address" ref={emailRef}
                                       className={`peer mt-1 w-full border-b-2 ${errors.email ? "border-rose-500" : "border-gray-300"} px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none`}/>
                                <label
                                    className="absolute pointer-events-none top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Email
                                    Address</label>
                            </div>

                            {errors.email && (
                                <p className="mt-1 text-sm text-rose-500">{errors.email}</p>
                            )}

                            <div className="relative mt-6">
                                <input type="password" placeholder="Password" ref={passwordOneRef}
                                       className={`peer mt-1 w-full border-b-2 ${errors.passwordOne ? "border-rose-500" : "border-gray-300"} px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none`}/>
                                <label
                                    className="absolute pointer-events-none top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Password</label>
                            </div>

                            {errors.passwordOne && (
                                <p className="mt-1 text-sm text-rose-500">{errors.passwordOne}</p>
                            )}

                            <div className="relative mt-6">
                                <input type="password" placeholder="Confirm Password" ref={passwordTwoRef}
                                       className={`peer mt-1 w-full border-b-2 ${errors.passwordTwo ? "border-rose-500" : "border-gray-300"} px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none`}/>
                                <label
                                    className="absolute pointer-events-none top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Confirm Password</label>
                            </div>

                            {errors.passwordTwo && (
                                <p className="mt-1 text-sm text-rose-500">{errors.passwordTwo}</p>
                            )}

                            <div className="my-6">
                                <button
                                    onClick={register}
                                    className="w-full font-bold cursor-pointer rounded-md bg-rose-600 px-3 py-4 text-white hover:bg-rose-700">Sign
                                    up
                                </button>
                            </div>
                            <p className="text-center text-sm text-gray-500">Already have an account?
                                <a href="/"
                                   className="font-semibold text-rose-600 hover:underline hover:text-rose-700 focus:outline-none"> Sign
                                    in
                                </a>.
                            </p>

                        </div>
                    </div>
                </div>
            </div>
    );
};

export default RegisterPage;
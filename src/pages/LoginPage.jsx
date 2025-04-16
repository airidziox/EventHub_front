import React, {useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import http from "../plugins/https.jsx"
import useStore from "../store/mainStore.jsx";

const LoginPage = () => {

    const navigate = useNavigate();

    const usernameRef = useRef();
    const passwordRef = useRef();

    const [errors, setErrors] = useState({});

    const {updateLoggedUser} = useStore((state) => state);

    function validate() {
        const newErrors = {};

        const username = usernameRef.current.value.trim();
        const password = passwordRef.current.value;


        if (!username) {
            newErrors.username = "Username is required.";
        }

        if (!password) {
            newErrors.password = "Password is required.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function login() {
        if (!validate()) return;

        const myUser = {
            username: usernameRef.current.value,
            password: passwordRef.current.value
        }

        const res = await http.postToken("http://localhost:2001/login", myUser)

        if (res.error) {
            const newErrors = {};
            console.log(res)
            if(res.message === "User does not exist!") {
                newErrors.username = res.message;
            }
            if(res.message === "Username or password is invalid.") {
                newErrors.password = res.message;
            }
            return setErrors(newErrors);
        } else {
            navigate("/home");
            localStorage.setItem("token", res.token)
            updateLoggedUser({
                id: res.user._id,
                username: res.user.username,
                email: res.user.email,
            })
            console.log(res)
        }
    }

    return (
            <div className="relative mx-auto w-full max-w-md bg-white mt-10 px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
                <div className="w-full">
                    <div className="text-center">
                        <h1 className="text-3xl font-semibold text-gray-900">Login</h1>
                        <p className="mt-2 text-gray-500">Sign in below to access your account.</p>
                    </div>
                    <div className="mt-5">
                        <div>

                            <div className="relative mt-6">
                                <input type="text" placeholder="Username" ref={usernameRef}
                                       className={`peer mt-1 w-full border-b-2 ${errors.username ? "border-rose-500" : "border-gray-300"} px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none`}/>
                                <label className="absolute pointer-events-none top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Username</label>
                            </div>

                            {errors.username && (
                                <p className="mt-1 text-sm text-rose-500">{errors.username}</p>
                            )}

                            <div className="relative mt-6">
                                <input type="password" placeholder="Password" ref={passwordRef}
                                       className={`peer mt-1 w-full border-b-2 ${errors.password ? "border-rose-500" : "border-gray-300"} px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none`}/>
                                <label className="absolute pointer-events-none top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Password</label>
                            </div>

                            {errors.password && (
                                <p className="mt-1 text-sm text-rose-500">{errors.password}</p>
                            )}

                            <div className="my-6">
                                <button
                                    onClick={login}
                                    className="w-full font-bold cursor-pointer rounded-md bg-rose-600 px-3 py-4 text-white hover:bg-rose-700">Login</button>
                            </div>
                            <p className="text-center text-sm text-gray-500">Don't have an account yet?
                                <a href="/register"
                                   className="font-semibold text-rose-600 hover:underline hover:text-rose-700 focus:outline-none"> Sign
                                    up
                                </a>.
                            </p>

                        </div>
                    </div>
                </div>
            </div>
    );
};

export default LoginPage;
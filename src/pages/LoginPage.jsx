import React from 'react';

const LoginPage = () => {
    return (
        <div className="max-w-screen-xl mx-auto flex">

            <div className="relative mx-auto w-full max-w-md bg-white mt-10 px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
                <div className="w-full">
                    <div className="text-center">
                        <h1 className="text-3xl font-semibold text-gray-900">Login</h1>
                        <p className="mt-2 text-gray-500">Sign in below to access your account.</p>
                    </div>
                    <div className="mt-5">
                        <div>
                            <div className="relative mt-6">
                                <input type="text" placeholder="Username"
                                       className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"/>
                                <label className="absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Username</label>
                            </div>
                            <div className="relative mt-6">
                                <input type="password" name="password" id="password" placeholder="Password"
                                       className="peer peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"/>
                                <label className="absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Password</label>
                            </div>
                            <div className="my-6">
                                <button className="w-full font-bold cursor-pointer rounded-md bg-rose-600 px-3 py-4 text-white hover:bg-rose-700">Login</button>
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
            </div>
    );
};

export default LoginPage;
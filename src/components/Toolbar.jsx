import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import useStore from '../store/mainStore.jsx';

const Toolbar = () => {

    const {loggedUser, updateLoggedUser} = useStore((state) => state);

    const navigate = useNavigate()

    function logout() {
        updateLoggedUser(null)
        navigate("/")
    }

    return (
        <>
            {loggedUser &&
            <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
                <Link className="block text-rose-600" to={"/home"}>
                    <span className="text-2xl font-bold">EventHub</span>
                </Link>

                <div className="flex flex-1 items-center justify-end md:justify-between">
                    <nav className="hidden md:block">
                        <ul className="flex items-center gap-3 text-sm font-medium text-gray-800">
                            <li>
                                <Link className="transition py-2 px-4 rounded-2xl hover:bg-rose-200" to={"/create"}>
                                    Create Event
                                </Link>
                            </li>

                            <li>
                                <Link className="transition py-2 px-4 rounded-2xl hover:bg-rose-200" to={"/myEvents"}>
                                    Your Events
                                </Link>
                            </li>

                            <li>
                                <Link className="transition py-2 px-4 rounded-2xl hover:bg-rose-200" to={"/favorites"}>
                                    Favorites
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    <div className="flex items-center gap-4">
                        <p className="text-sm">Logged in as: <span className="underline">{loggedUser.username}</span></p>
                        <div className="sm:flex sm:gap-4">
                            <a
                                onClick={logout}
                                className="block cursor-pointer rounded-md bg-rose-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-rose-600">
                                Logout
                            </a>
                        </div>

                    </div>
                </div>
            </div>
            }
        </>
    );
};

export default Toolbar;
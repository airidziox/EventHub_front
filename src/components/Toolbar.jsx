import React from 'react';
import {Link} from "react-router-dom";
import useStore from '../store/main.jsx';

const Toolbar = () => {

    const {loggedUser} = useStore((state) => state);

    return (
        <>
            <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8 border-b border-b-gray-500">
                <a className="block text-rose-600" href="/home">
                    <span className="text-2xl font-bold">EventHub</span>
                </a>

                <div className="flex flex-1 items-center justify-end md:justify-between">
                    <nav aria-label="Global" className="hidden md:block">
                        <ul className="flex items-center gap-6 text-sm">
                            <li>
                                <a className="text-gray-900 transition hover:text-gray-500/75" href="#">
                                    Create Event
                                </a>
                            </li>

                            <li>
                                <a className="text-gray-900 transition hover:text-gray-500/75" href="#">
                                    Your Events
                                </a>
                            </li>

                            <li>
                                <a className="text-gray-900 transition hover:text-gray-500/75" href="#">
                                    Favorite Events
                                </a>
                            </li>
                        </ul>
                    </nav>

                    <div className="flex items-center gap-4">
                        <div className="sm:flex sm:gap-4">
                            <a className="block rounded-md bg-rose-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-rose-700"
                               href="#">
                                Logout
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Toolbar;
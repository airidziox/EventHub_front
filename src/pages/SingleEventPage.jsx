import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import http from "../plugins/https.jsx";

const SingleEventPage = () => {

    const params = useParams()
    const navigate = useNavigate();
    const [event, setEvent] = useState({})

    useEffect(() => {
        http.getToken(`http://localhost:2001/event/${params.id}`)
            .then(res => {
                setEvent(res)
            })
    }, []);

    return (
        <div>
            <div className="bg-gray-50 dark:bg-gray-900 ring-1 ring-gray-900/5 dark:ring-gray-800 shadow-md min-h-screen pb-16">
                {/* Hero Banner */}
                <div className="relative h-[400px] w-full">
                    <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex flex-col justify-end px-6 py-10 md:px-16">
                        <h1 className="text-white text-4xl md:text-5xl font-bold">{event.title}</h1>
                        <p className="text-gray-200 mt-2 text-lg">
                            {event.location} • {event.date} - {event.time}
                        </p>
                    </div>
                </div>

                {/* Event Content */}
                <div className="max-w-5xl mx-auto px-6 mt-10 grid md:grid-cols-3 gap-10">
                    {/* Left Side */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="space-y-2">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Event Description</h2>
                            <p className="text-gray-700 text-base leading-relaxed dark:text-gray-400">
                                {event.description}
                            </p>
                        </div>

                        <div className="mt-6">
                            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">Hosted By</h3>
                            <div className="flex items-center gap-3">
                                <div
                                    className="bg-rose-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold uppercase">
                                    {event?.username?.[0]}
                                </div>
                                <p className="text-gray-700 dark:text-gray-400 font-medium">
                                    {event.username}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6 text">
                        <div className="bg-white dark:bg-gray-800 border-gray-200 shadow-md p-6 rounded-2xl">
                            <p className="text-gray-600 dark:text-gray-500 mb-2">Date & Time</p>
                            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                {event.date} - {event.time}
                            </p>
                            <hr className="my-4 border-gray-400"/>
                            <p className="text-gray-600 dark:text-gray-500 mb-2">Location</p>
                            <p className="text-base text-gray-800 dark:text-gray-200 font-medium">{event.location}</p>
                            <hr className="my-4 border-gray-400"/>
                            <p className="text-gray-600 dark:text-gray-500 mb-2">Seats Available</p>
                            <p className="text-base font-semibold text-rose-600">{event.seats}</p>
                        </div>

                        <div className="flex flex-col items-center gap-4">
                            <button
                                className="w-full cursor-pointer bg-rose-600 hover:bg-rose-700 text-white py-3 px-6 rounded-xl text-lg font-semibold shadow-lg transition-all">
                                Reserve Your Seat
                            </button>
                            <button
                                onClick={() => navigate(-1)}
                                className="font-medium mb-3 px-3 py-2 rounded-full bg-rose-100 hover:bg-rose-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors cursor-pointer text-sm text-rose-700 dark:text-gray-200"
                            >
                                ← Back to Events
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
};

export default SingleEventPage;
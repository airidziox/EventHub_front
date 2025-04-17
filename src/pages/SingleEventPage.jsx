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
        <div className="bg-gray-50 ring-1 ring-gray-900/5 shadow-md min-h-screen pb-16">
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
                        <h2 className="text-xl font-semibold text-gray-800">Event Description</h2>
                        <p className="text-gray-700 text-base leading-relaxed">
                            {event.description}
                        </p>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-lg font-medium text-gray-800 mb-2">Hosted By</h3>
                        <div className="flex items-center gap-3">
                            <div
                                className="bg-rose-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold uppercase">
                                {event?.username?.[0]}
                            </div>
                            <p className="text-gray-700 font-medium">
                                {event.username}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white shadow-md p-6 rounded-2xl">
                        <p className="text-gray-600 mb-2">Date & Time</p>
                        <p className="text-lg font-semibold text-gray-800">
                            {event.date} - {event.time}
                        </p>
                        <hr className="my-4"/>
                        <p className="text-gray-600 mb-2">Location</p>
                        <p className="text-base text-gray-800 font-medium">{event.location}</p>
                        <hr className="my-4"/>
                        <p className="text-gray-600 mb-2">Seats Available</p>
                        <p className="text-base font-semibold text-rose-600">{event.seats}</p>
                    </div>

                    <button
                        className="w-full cursor-pointer bg-rose-600 hover:bg-rose-700 text-white py-3 px-6 rounded-xl text-lg font-semibold shadow-lg transition-all">
                        Reserve Your Seat
                    </button>

                    <button
                        onClick={() => navigate(-1)}
                        className="w-full cursor-pointer text-sm text-gray-500 hover:text-black underline"
                    >
                        ← Back to Events
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SingleEventPage;
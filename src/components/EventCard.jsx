import React, {useRef, useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import useStore from "../store/mainStore.jsx";
import http from "../plugins/https.jsx";

const EventCard = ({event}) => {

    const titleRef = useRef();
    const descriptionRef = useRef();
    const locationRef = useRef();
    const dateRef = useRef();
    const timeRef = useRef();
    const seatsRef = useRef();
    const imageRef = useRef();

    const {loggedUser, updateEvents} = useStore((state) => state);

    const [errors, setErrors] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    function validate() {
        const newErrors = {};

        const title = titleRef.current.value.trim();
        const description = descriptionRef.current.value.trim();
        const location = locationRef.current.value.trim();
        const date = dateRef.current.value;
        const time = timeRef.current.value;
        const seats = seatsRef.current.value;
        const image = imageRef.current.value.trim();

        if (!title) {
            newErrors.title = "Title is required.";
        }
        else if (title.length < 5)
            newErrors.title = "Title must be at least 5 symbols long.";

        if (!description) {
            newErrors.description = "Description is required.";
        }
        else if (description.length < 10)
            newErrors.description = "Description must be at least 10 symbols long.";

        if (!location) {
            newErrors.location = "Location is required.";
        }

        if (!date) {
            newErrors.date = "Date is required.";
        }

        if (!time) {
            newErrors.time = "Time is required.";
        }

        if (!seats) {
            newErrors.seats = "Seat number is required.";
        }
        else if (seats <= 5) {
            newErrors.seats = "Event must have at least 5 seats.";
        }

        if (!image) {
            newErrors.image = "Image is required.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function edit() {
        if (!validate()) return;

        const eventUpdate = {
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            location: locationRef.current.value,
            date: dateRef.current.value,
            time: timeRef.current.value,
            seats: seatsRef.current.value,
            image: imageRef.current.value
        }

        const res = await http.postToken("http://localhost:2001/edit", eventUpdate)

        if (res.error) {
            const newErrors = {};
            console.log(res)
            if(res.message === "Image link is invalid.") {
                newErrors.image = res.message;
            }
            return setErrors(newErrors);
        } else {
            updateEvents(res.events)
            setIsModalOpen(false)
            console.log(res)
        }
    }

    useEffect(() => {
        if (isModalOpen) {
            titleRef.current.value = event.title
            descriptionRef.current.value = event.description
            locationRef.current.value = event.location
            dateRef.current.value = event.date
            timeRef.current.value = event.time
            seatsRef.current.value = event.seats
            imageRef.current.value = event.image
        }
    }, [isModalOpen]);

    return (
        <div
            className="relative rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-200">
            {/* Seats badge */}
            <div
                className="absolute flex gap-1 top-3 right-3 bg-rose-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/>
                </svg>
                {event.seats} left
            </div>

            {/* Event image */}
            <Link to={`/event/${event._id}`}>
                <img className="w-full h-48 object-cover"
                     src={event.image}
                     alt="Event"/>
            </Link>

            {/* Event info */}
            <div className="p-4">
                <div className="flex justify-between">
                    <Link to={`/event/${event._id}`}>
                        <h2 className="text-xl font-semibold text-gray-800">{event.title}</h2>
                    </Link>
                    {loggedUser.username === event.username &&
                        <div
                            onClick={() => setIsModalOpen(true)}
                            className="text-sm cursor-pointer text-white bg-gray-800 hover:bg-gray-600 font-medium py-1 px-2 rounded-md transition">Edit</div>
                    }
                </div>

                {/* Edit Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex justify-center items-center z-50 animate-fade" onClick={() => setIsModalOpen(false)}>
                        <div className="bg-white p-6 rounded-2xl shadow-xl ring-1 ring-gray-900/5 w-[90%] max-w-md" onClick={(e) => e.stopPropagation()}>

                            {/* Form */}
                            <h1 className="text-center text-3xl font-semibold text-gray-900">Edit Event</h1>
                            <div className="mt-5">
                                <div>

                                    {/* Title */}
                                    <div className="relative mt-6">
                                        <input type="text" placeholder="Title" ref={titleRef} required
                                               className={`peer mt-1 w-full border-b-2 ${errors.title ? "border-rose-500" : "border-gray-300"} px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none`}/>
                                        <label
                                            className="absolute pointer-events-none top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">
                                            Title</label>
                                    </div>

                                    {errors.title && (
                                        <p className="mt-1 text-sm text-rose-500">{errors.title}</p>
                                    )}

                                    {/* Description */}
                                    <div className="relative mt-6">
                                        <input type="text" placeholder="Description" ref={descriptionRef} required
                                               className={`peer mt-1 w-full border-b-2 ${errors.description ? "border-rose-500" : "border-gray-300"} px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none`}/>
                                        <label
                                            className="absolute pointer-events-none top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">
                                            Description</label>
                                    </div>

                                    {errors.description && (
                                        <p className="mt-1 text-sm text-rose-500">{errors.description}</p>
                                    )}

                                    {/* Location */}
                                    <div className="relative mt-6">
                                        <input type="text" placeholder="Location" ref={locationRef} required
                                               className={`peer mt-1 w-full border-b-2 ${errors.location ? "border-rose-500" : "border-gray-300"} px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none`}/>
                                        <label
                                            className="absolute pointer-events-none top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">
                                            Location</label>
                                    </div>

                                    {errors.location && (
                                        <p className="mt-1 text-sm text-rose-500">{errors.location}</p>
                                    )}

                                    {/* Seats Input */}
                                    <div className="relative mt-6 w-full">
                                        <input type="number" placeholder="Number of seats" ref={seatsRef} required
                                               className={`peer mt-1 w-full border-b-2 ${errors.seats ? "border-rose-500" : "border-gray-300"} px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none`}/>
                                        <label
                                            className="absolute pointer-events-none top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">
                                            Number of seats</label>
                                    </div>

                                    {errors.seats && (
                                        <p className="relative mt-1 text-sm text-rose-500">{errors.seats}</p>
                                    )}

                                    {/* Image Upload */}
                                    <div className="relative mt-6 w-full">
                                        <input type="text" placeholder="Event Image URL" ref={imageRef} required
                                               className={`peer mt-1 w-full border-b-2 ${errors.image ? "border-rose-500" : "border-gray-300"} px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none`}/>
                                        <label
                                            className="absolute pointer-events-none top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">
                                            Event Image URL</label>
                                    </div>

                                    {errors.image && (
                                        <p className="relative mt-1 text-sm text-rose-500">{errors.image}</p>
                                    )}

                                    <div className="grid grid-cols-2 gap-4 mt-6">
                                        {/* Date */}
                                        <div>
                                            <label className="block mb-1 text-gray-500 opacity-75">Date</label>
                                            <input type="date" ref={dateRef} required
                                                   className={`w-full border border-gray-300 ${errors.image ? "border-rose-500" : "border-gray-300"} rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500`}/>
                                            {errors.date && (
                                                <p className="mt-1 text-sm text-rose-500">{errors.date}</p>
                                            )}
                                        </div>

                                        {/* Time */}
                                        <div>
                                            <label className="block mb-1 text-gray-500 opacity-75">Time</label>
                                            <input type="time" ref={timeRef} required
                                                   className={`w-full border border-gray-300 ${errors.image ? "border-rose-500" : "border-gray-300"} rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500`}/>
                                            {errors.time && (
                                                <p className="mt-1 text-sm text-rose-500">{errors.time}</p>
                                            )}
                                        </div>
                                    </div>


                                    <div className="mt-6">
                                        <button
                                            onClick={edit}
                                            className="w-full font-bold cursor-pointer rounded-xl bg-rose-500 px-3 py-4 text-white hover:bg-rose-600">Edit
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <p className="text-sm text-gray-500 mt-1">📍 {event.location}</p>
                <p className="text-sm text-gray-500">📅 {event.date} – {event.time}</p>
                <p className="text-sm text-gray-500">👤 Created by: {event.username}</p>

                <p className="text-sm text-gray-700 mt-3 line-clamp-3">
                    {event.description}
                </p>

                <div className="mt-4">
                    <Link to={`/event/${event._id}`}>
                        <button
                            className="w-full cursor-pointer bg-rose-500 hover:bg-rose-600 text-white font-medium py-2 px-4 rounded-xl transition">
                            View Details
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
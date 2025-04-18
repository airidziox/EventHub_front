import React, {useRef, useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import useStore from "../store/mainStore.jsx";
import http from "../plugins/https.jsx";

const CreatePage = () => {

    useEffect(() => {
        if (!loggedUser) {
            navigate("/")
        }
    }, []);

    const navigate = useNavigate();

    const titleRef = useRef();
    const descriptionRef = useRef();
    const locationRef = useRef();
    const dateRef = useRef();
    const timeRef = useRef();
    const seatsRef = useRef();
    const imageRef = useRef();
    const categoryRef = useRef()

    const [errors, setErrors] = useState({});

    const {loggedUser, updateEvents} = useStore((state) => state);

    function validate() {
        const newErrors = {};

        const title = titleRef.current.value.trim();
        const description = descriptionRef.current.value.trim();
        const location = locationRef.current.value.trim();
        const date = dateRef.current.value;
        const time = timeRef.current.value;
        const seats = seatsRef.current.value;
        const image = imageRef.current.value.trim();
        const category = categoryRef.current.value

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

        if (!category) {
            newErrors.category = "Category is required.";
        }

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
        else if (seats < 5) {
            newErrors.seats = "Event must have at least 5 seats.";
        }

        if (!image) {
            newErrors.image = "Image is required.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function create() {
        if (!validate()) return;

        const event = {
            authorId: loggedUser.id,
            username: loggedUser.username,
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            location: locationRef.current.value,
            date: dateRef.current.value,
            time: timeRef.current.value,
            seats: seatsRef.current.value,
            image: imageRef.current.value,
            category: categoryRef.current.value
        }

        const res = await http.postToken("http://localhost:2001/create", event)

        if (res.error) {
            const newErrors = {};
            console.log(res)
            if(res.message === "Image link is invalid.") {
                newErrors.image = res.message;
            }
            return setErrors(newErrors);
        } else {
            updateEvents(res.events)
            console.log(res)
            navigate("/home")
        }
    }

    return (
        <div
            className="relative mx-auto w-full max-w-md bg-white mt-10 px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 rounded-2xl sm:px-10">
            <div className="w-full">
                <div className="text-center">
                    <h1 className="text-3xl font-semibold text-gray-900">Create Event</h1>
                    <p className="mt-2 text-gray-500">Please fill form below to create your event.</p>
                </div>
                <div className="mt-5">
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

                        <div className="mt-6">
                            <label className="block mb-1 text-gray-500 opacity-75">Category</label>
                            <select
                                id="category"
                                name="category"
                                ref={categoryRef}
                                className={`w-full border border-gray-300 ${errors.category ? "border-rose-500" : "border-gray-300"} rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500`}
                            >
                                <option value="">Select category</option>
                                <option value="Music">Music</option>
                                <option value="Sports">Sports</option>
                                <option value="Conference">Conference</option>
                                <option value="Art">Art</option>
                                <option value="Technology">Technology</option>
                                <option value="Festival">Festival</option>
                                <option value="Education">Education</option>
                                <option value="Business">Business</option>
                            </select>
                        </div>

                        {errors.category && (
                            <p className="mt-1 text-sm text-rose-500">{errors.category}</p>
                        )}

                        <div className="grid grid-cols-2 gap-4 mt-6">
                            {/* Date */}
                            <div>
                                <label className="block mb-1 text-gray-500 opacity-75">Date</label>
                                <input type="date" ref={dateRef} required
                                       className={`w-full border border-gray-300 ${errors.date ? "border-rose-500" : "border-gray-300"} rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500`}/>
                                {errors.date && (
                                    <p className="mt-1 text-sm text-rose-500">{errors.date}</p>
                                )}
                            </div>

                            {/* Time */}
                            <div>
                                <label className="block mb-1 text-gray-500 opacity-75">Time</label>
                                <input type="time" ref={timeRef} required
                                       className={`w-full border border-gray-300 ${errors.time ? "border-rose-500" : "border-gray-300"} rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500`}/>
                                {errors.time && (
                                    <p className="mt-1 text-sm text-rose-500">{errors.time}</p>
                                )}
                            </div>
                        </div>


                        <div className="mt-6">
                            <button
                                onClick={create}
                                className="w-full font-bold cursor-pointer rounded-xl bg-rose-500 px-3 py-4 text-white hover:bg-rose-600">Create
                            </button>
                        </div>

                    </div>
            </div>
        </div>
    );
};

export default CreatePage;
import React, {useEffect} from 'react';
import useStore from "../store/mainStore.jsx";
import {useNavigate} from "react-router-dom";
import http from "../plugins/https.jsx";
import EventCard from "../components/EventCard.jsx";

const HomePage = () => {

    useEffect(() => {
        if (!loggedUser) {
            navigate("/")
        }
    }, []);

    const navigate = useNavigate();

    const {loggedUser, events, updateEvents} = useStore((state) => state);

    useEffect(() => {
        http.getToken("http://localhost:2001/allEvents")
            .then(res => {
                updateEvents(res)
            })
    }, [events]);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-5">
            {events?.map(event =>
                <EventCard key={event._id} event={event}/>
            )}
        </div>
    );
};

export default HomePage;
import React, {useEffect} from 'react';
import useStore from "../store/mainStore.jsx";
import {useNavigate} from "react-router-dom";
import http from "../plugins/https.jsx";
import EventCard from "../components/EventCard.jsx";
import HeroCarousel from "../components/HeroCarousel.jsx";
import Categories from "../components/Categories.jsx";

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
        <div className="d-flex flex-column align-items-center">
            <div>
                <HeroCarousel/>
            </div>

            <div className="mt-5 py-7">
                <Categories/>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-5">
                {events?.map(event =>
                    <EventCard key={event._id} event={event}/>
                )}
            </div>
        </div>

    );
};

export default HomePage;
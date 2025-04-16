import React, {useEffect} from 'react';
import useStore from "../store/mainStore.jsx";
import {useNavigate} from "react-router-dom";

const HomePage = () => {

    useEffect(() => {
        if (!loggedUser) {
            navigate("/")
        }
    }, []);

    const navigate = useNavigate();

    const {loggedUser} = useStore((state) => state);

    return (
        <div className="flex mt-5 text-sm">
            Events displayed here.
        </div>
    );
};

export default HomePage;
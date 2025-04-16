import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css'
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import Toolbar from "./components/Toolbar.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import MyEventsPage from "./pages/MyEventsPage.jsx";
import FavoritesPage from "./pages/FavoritesPage.jsx";


function App() {

  return (
    <>
        <BrowserRouter>
            <Toolbar/>
            <div className="mx-auto max-w-screen-xl p-3">
                <Routes>
                    <Route path="/" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/home" element={<HomePage/>}/>
                    <Route path="/create" element={<CreatePage/>}/>
                    <Route path="/myEvents" element={<MyEventsPage/>}/>
                    <Route path="/favorites" element={<FavoritesPage/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    </>
  )
}

export default App

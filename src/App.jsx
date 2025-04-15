import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css'
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import Toolbar from "./components/Toolbar.jsx";


function App() {

  return (
    <>
        <BrowserRouter>
            <Toolbar/>
            <div className="d-flex flex-column gap-5 p-3">
                <Routes>
                    <Route path="/" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/home" element={<HomePage/>}/>
                </Routes>
            </div>
            {/*<Footer/>*/}
        </BrowserRouter>
    </>
  )
}

export default App

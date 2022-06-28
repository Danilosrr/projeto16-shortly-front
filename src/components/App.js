import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "../assets/GlobalStyle.js";
import "../assets/css/fonts.css";

import LoadingContext from "../context/LoadingContext.js";
import UserContext from "../context/UserContext.js";
import { useState, useEffect } from "react";
import Signin from "./SignIn.js";
import Signup from "./Signup.js";
import Home from "./Home.js";
import Ranking from "./Ranking.js";


export default function App() {
    const [loading,setLoading] = useState(false);
    const [token, setToken] = useState(null);

    useEffect(()=>{
        try {
            const localToken=localStorage.getItem('shortlyToken')
            setToken(localToken);
        } catch (error) {
            console.log(error);
        };
    }, [])

    return (
        <>
            <GlobalStyle/>
            <UserContext.Provider value={{token, setToken}}>
                <LoadingContext.Provider value={{loading,setLoading}}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/signup" element={<Signup/>}/>
                            <Route path="/signin" element={<Signin/>}/>
                            <Route path="/ranking" element={<Ranking/>}/>
                        </Routes>
                    </BrowserRouter>
                </LoadingContext.Provider>
            </UserContext.Provider>
        </>
    );
}
import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../auth/login";
import Library from "../Library/Library";
import Feed from "../Feed/Feed";
import Player from "../Player/Player";
import Fav from "../Fav/Fav";
import Trending from "../Trending/Trending";
import "./home.css"
import { setClientToken } from "../../Spotify";
// import { setClientToken } from "../../Spotify";
const Home = () => {
    const [token, setToken] = useState("");
    useEffect(() => {
        const token = window.localStorage.getItem("token");
        const hash = window.location.hash;
        window.location.hash = "";
        if (!token && hash) {
            const _token = hash.split("&")[0].split("=")[1];
            window.localStorage.setItem("token", _token);
            setToken(_token);
            setClientToken(_token);
        }
        else{
            setToken(token);
            setClientToken(token);
        }
    }, [])
    return !token ? (<Login />)
        :
        (
            <Router>
                <div className="main-body">
                    <Sidebar />
                    <Routes>
                        <Route path="/" element={<Library />} />
                        <Route path="/feed" element={<Feed />} />
                        <Route path="/player" element={<Player />} />
                        <Route path="/trending" element={<Trending />} />
                        <Route path="/fav" element={<Fav />} />
                    </Routes>
                </div>
            </Router>
        )
}
export default Home;

import React, { useState, useEffect } from "react";
import SideBarButton from "./sidebarbutton";
import "./side.css";
import { MdFavorite } from "react-icons/md";
import { FaPlay } from "react-icons/fa6";
import { IoIosTrendingUp } from "react-icons/io";
import { FaSignOutAlt } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { IoLibrary } from "react-icons/io5";
import apiClient, { setClientToken } from "../../Spotify";

const Sidebar = () => {
  const [image, setImage] = useState("https://images.unsplash.com/photo-1546840207-3d1d487ef205?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG11c2ljJTIwZ2lybHxlbnwwfHwwfHx8MA%3D%3D");

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      // Set the access token for API requests
      setClientToken(token);

      // Fetch user data with the access token
      apiClient.get("me")
        .then((response) => {
          const imagesArray = response.data.images;
          if (Array.isArray(imagesArray) && imagesArray.length > 0) {
            setImage(imagesArray[0].url);
          } else {
            console.warn("No images found in the response.");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    } else {
      console.error("Access token not available.");
    }
  }, []);

  return (
    <div className="side-container">
      <img src={image} className="profile-img" alt="profile-pic" />
      <div className="side">
        <SideBarButton title="Feed" to="/feed" icon={<MdSpaceDashboard />} />
        <SideBarButton title="Trending" to="/trending" icon={<IoIosTrendingUp />} />
        <SideBarButton title="Player" to="/player" icon={<FaPlay />} />
        <SideBarButton title="Favorites" to="/fav" icon={<MdFavorite />} />
        <SideBarButton title="Library" to="/" icon={<IoLibrary />} />
      </div>
      <SideBarButton title="Sign Out" to="" icon={<FaSignOutAlt />} />
    </div>
  );
};

export default Sidebar;

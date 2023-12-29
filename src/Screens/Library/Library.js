import React from "react";
import { useState, useEffect } from "react";
import APIKit from "../../Spotify";
import { FaPlayCircle } from "react-icons/fa";
import "./library.css";
import { useNavigate } from "react-router-dom";
const Library = () => {
  const [playlists, setPlaylists] = useState(null);
  useEffect(() => {
    APIKit.get("me/playlists").then(function (response) {
      setPlaylists(response.data.items);
      console.log(response.data.items);
    });
  }, []);
  const navigate = useNavigate();
  const playPlaylist = (id) => {
    navigate("/player", { state: { id: id } })
  }
  return (
    <div className="screen-container">
      <div className="lib-body">
        {playlists?.map((playlist) => (
          <div className="play-cards" key={playlist.id} onClick={() => playPlaylist(playlist.id)}>
            <img
              src={playlist.images[0].url}
              className="play-image"
              alt="playlist-pic"
            />
            <p className="play-tit">{playlist.name}</p>
            <p className="play-subt">
              {playlist.tracks.total}{" "}
              {playlist.tracks.total > 1 ? "Songs" : "Song"}
            </p>
            <div className="play-icon">
              <FaPlayCircle className="icon" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Library;

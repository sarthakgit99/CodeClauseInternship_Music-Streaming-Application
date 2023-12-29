import React, { useEffect, useState } from "react";
import "./player.css";
import { useLocation } from "react-router-dom";
import Song from "../../Components/songCard/song";
import Queue from "../../Components/queue/queue";
import Music from "../../Components/MusicPlayer/audio";
import apiClient from "../../Spotify";
import Widget from "../../Components/Widgets/widget";
const Player = () => {
  const location = useLocation();
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    if (location.state) {
      apiClient
        .get("playlists/" + location.state?.id + "/tracks")
        .then((res) => {
          setTracks(res.data.items);
          setCurrentTrack(res.data?.items[0]?.track);
        });
    }
  }, [location.state]);
  useEffect(() => {
    if (
      tracks.length > 0 &&
      currentIndex >= 0 &&
      currentIndex < tracks.length
    ) {
      setCurrentTrack(tracks[currentIndex].track);
    }
  }, [currentIndex, tracks]);

  return (
    <div className="screen-container flex">
      <div className="left-player">
        <Music
          currentTrack={currentTrack}
          total={tracks}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
        <Widget artistID={currentTrack?.album?.artists[0]?.id}/>
      </div> 

      <div className="right-player">
        {currentTrack.album && <Song album={currentTrack.album} />}
        <Queue tracks={tracks} setCurrentIndex={setCurrentIndex} />
      </div>
    </div>
  );
};
export default Player;

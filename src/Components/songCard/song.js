import React from "react";
import "./song.css";
import SongBody from "./songBody";
import SongInfo from "./songInfo";
const Song=({album})=>{
    return(
        <div className="song-body">
            <SongBody url={album?.images[0]?.url} />
            <SongInfo album={album}/>
        </div>
    )
}
export default Song;
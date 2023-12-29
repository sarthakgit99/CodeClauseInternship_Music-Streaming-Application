import React from "react";
import "./songBody.css"
const SongBody = ({ url }) => {
    return (
        <div className="song-image flex">
           <img src={url} alt="song-art" className="art"/>
           <div className="shadow">
            <img src={url} alt="shadow" className="shadow"/>
           </div>
        </div>
    )
}
export default SongBody;
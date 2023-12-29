import React from "react";
import "./songInfo.css";
const SongInfo = ({ album }) => {
  const artists = [];
  album?.artists?.forEach((element) => artists.push(element.name));
  return (
    <div className="song-content">
      <div className="album-name">
        <div className="desc">
          <p>{album?.name + "-" + artists?.join(",")}</p>
        </div>
      </div>
      <div className="album-info">
        <p>{`${album?.name} is an ${album?.album_type} by ${artists?.join(
          ","
        )} with ${
          album?.total_tracks > 1
            ? album.total_tracks + " tracks"
            : 1 + " track"
        } `}</p>
      </div>
      <div className="album-release">
        <p>{`Release Date : ${album?.release_date}`}</p>
      </div>
    </div>
  );
};
export default SongInfo;

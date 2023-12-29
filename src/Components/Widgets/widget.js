import React, { useEffect, useState } from "react";
import apiClient from "../../Spotify";
import WidgetCard from "./widgetCard";
import "./widgets.css";
const Widget = ({ artistID }) => {
  const [similar, setSimilar] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [newRelease, setNewRelease] = useState([]);
  console.log(similar, featured, newRelease);
  // const id=artistID?.artists[0]?.id;
  useEffect(() => {
    if (artistID) {
      apiClient
        .get(`/artists/${artistID}/related-artists`)
        .then((res) => {
          const a = res.data?.artists.slice(0, 3);
          setSimilar(a);
        })
        .catch((err) => console.error(err));
      apiClient
        .get(`/browse/featured-playlists`)
        .then((res) => {
          const a = res.data?.playlists.items.slice(0, 3);
          setFeatured(a);
        })
        .catch((err) => console.error(err));
      apiClient
        .get(`/browse/new-releases`)
        .then((res) => {
          const a = res.data?.albums.items.slice(0, 3);
          setNewRelease(a);
        })
        .catch((err) => console.error(err));
    }
  }, [artistID]);
  return (
    <div className="widget flex">
      <WidgetCard title="Similar Artists" similar={similar} />
      <WidgetCard title="More of what you like" featured={featured} />
      <WidgetCard title="Fresh Releases" newRelease={newRelease} />
    </div>
  );
};
export default Widget;

import React from "react";
import "./widgetCard.css";
import WidgetData from "./widgetData";
import { IconContext } from "react-icons";
import { MdArrowForwardIos } from "react-icons/md";
const WidgetCard = ({ title, similar, featured, newRelease }) => {
  return (
    <div className="widget-card">
      <p className="w-title">{title}</p>
      {similar
        ? similar.map((artist) => (
          <WidgetData
            title={artist?.name}
            subtitle={artist?.followers?.total}
            image={artist?.images[2]?.url}
          />
        ))
        : featured
          ? featured.map((playlist) => (
            <WidgetData
              title={playlist?.name}
              subtitle={playlist?.tracks?.total}
              image={playlist?.images[0]?.url}
            />
          ))
          : newRelease
            ? newRelease.map((album) => (
              <WidgetData
                title={album?.name}
                subtitle={album?.artists[0]?.name}
                image={album?.images[2]?.url}
              />
            ))
            : null}
      <div className="wid-end">
        <IconContext.Provider value={{ size: "24px", color: "whitesmoke" }}>
          <MdArrowForwardIos />
        </IconContext.Provider>
      </div>
    </div>
  );
};
export default WidgetCard;

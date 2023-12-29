import React from "react";
import "./widgetData.css"
export default function WidgetData({title,subtitle,image}){
    return(
        <div className="data flex">
            <img src={image} alt={title} className="data-image"/>
            <div className="data-right">
                <p className="data-title">{title}</p>
                <p className="data-subtitle">{subtitle}</p>
            </div>
        </div>
    )
}
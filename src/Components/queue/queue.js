import React from "react";
import "./queue.css"
const Queue=({tracks,setCurrentIndex})=>{
    console.log(tracks);
    return(
        <div className="queue-container flex">
            Songs index
            <div className="queue flex">
                <p className="upnext">Up Next</p>
                <div className="queue-list">
                    {tracks?.map((track,index)=>(
                        <div className="track flex" onClick={()=>setCurrentIndex(index)}>
                            <p className="tp">{track?.track?.name}</p>
                            <p className="min">{(track?.track?.duration_ms/60000).toFixed(2)} mins</p>
                        </div>
                    ))
                    }
                </div>
            </div>
        </div>
    )
}
export default Queue;
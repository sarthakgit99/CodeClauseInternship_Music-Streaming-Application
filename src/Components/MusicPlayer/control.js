  import React from "react";
  import "./control.css";
  import { IconContext } from "react-icons";
  import { FaBackwardStep, FaPlay, FaCirclePause, FaForwardStep } from "react-icons/fa6";

  const Control = ({ isPlaying, setIsPlaying, handleNext, handlePrev, handlePlayPause  }) => {
    return (
      <IconContext.Provider value={{ size: "35px", color: "#c4d0e3" }}>
        <div className="controls flex">
          <div className="control-btn flex" onClick={handlePrev}>
            <FaBackwardStep />
          </div>
          <div className="play-pause flex" onClick={()=> handlePlayPause()}>
            {isPlaying ? <FaCirclePause /> : <FaPlay />}
          </div>
          <div className="control-btn flex" onClick={handleNext}>
            <FaForwardStep />
          </div>
        </div>
      </IconContext.Provider>
    );
  };

  export default Control;

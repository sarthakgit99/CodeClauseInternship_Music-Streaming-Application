import React, { useEffect, useState, useRef } from "react";
import "./audio.css";
import Progress from "./circle";
import Animation from "./waveAnimation";
import Control from "./control";
export default function AudioPLayer({
  currentTrack,
  currentIndex,
  setCurrentIndex,
  total,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);
  var audioSrc = total[currentIndex]?.track.preview_url;

  const audioRef = useRef(new Audio(total[0]?.track.preview_url));

  const intervalRef = useRef();

  const isReady = useRef(false);

  const { duration } = audioRef.current;

  const currentPercentage = duration ? (trackProgress / duration) * 100 : 0;

  const startTimer = () => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        handleNext();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };
  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => console.error("Play error:", error));
      }
      setIsPlaying(!isPlaying);
    }
  };
  useEffect(() => {
    if (audioRef.current.src) {
      if (isPlaying) {
        audioRef.current.play();
        startTimer();
      } else {
        clearInterval(intervalRef.current);
        audioRef.current.pause();
      }
    } else {
      if (isPlaying) {
        audioRef.current = new Audio(audioSrc);
        audioRef.current.play();
        startTimer();
      } else {
        clearInterval(intervalRef.current);
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(audioSrc);

    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      isReady.current = true;
    }
  }, [currentIndex]);

  useEffect(() => {
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
      audioRef.current = null; 
    };
  }, []);

  const handleNext = () => {
    if (currentIndex < total.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else setCurrentIndex(0);
  };

  const handlePrev = () => {
    if (currentIndex - 1 < 0) setCurrentIndex(total.length - 1);
    else setCurrentIndex(currentIndex - 1);
  };

  const Zero = (n) => {
    return n > 9 ? "" + n : "0" + n;
  };
  const artists = [];
  currentTrack?.album?.artists.forEach((artist) => {
    artists.push(artist.name);
  });
  return (
    <div className="player-body flex">
      <div className="left-player-body">
        <Progress
          percentage={currentPercentage}
          isPlaying={true}
          size={300}
          color="skyblue"
          image={currentTrack?.album?.images[0]?.url}
        />
      </div>
      <div className="right-player-body flex">
        <p className="song-title">{currentTrack?.name}</p>
        <p className="song-artists">{artists.join(" | ")}</p>
        <div className="song-right-bottom flex">
          <div className="song-duration flex">
            <p className="duration">0:{Zero(Math.round(trackProgress))}</p>
            <Animation isPlaying={isPlaying} />
            <p className="duration">0.30</p>
          </div>
          <Control
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            handleNext={handleNext}
            handlePrev={handlePrev}
            handlePlayPause={ handlePlayPause}
            total={total}
          />
        </div>
      </div>
    </div>
  );
};


// import React, { useEffect, useState, useRef } from "react";
// import "./audio.css";
// import Progress from "./circle";
// import Animation from "./waveAnimation";
// import Control from "./control";

// const Music = ({ currentTrack, currentIndex, setCurrentIndex, total }) => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [trackProgress, setTrackProgress] = useState(0);
//   var audioSrc = total[currentIndex]?.track.preview_url;
//   const audioRef = useRef(new Audio(audioSrc));
//   const intervalRef = useRef();
//   const isReady = useRef(false);
//   const { duration } = audioRef.current;
//   const currentPercentage = duration ? (trackProgress / duration) * 100 : 0;

//   const startTimer = () => {
//     clearInterval(intervalRef.current);
//     intervalRef.current = setInterval(() => {
//       if (audioRef.current.ended) {
//         handleNext();
//       } else {
//         setTrackProgress(audioRef.current.currentTime);
//       }
//     }, 1000);
//   };

//   const handlePlayPause = () => {
//     if (isPlaying) {
//       audioRef.current.pause();
//       clearInterval(intervalRef.current);
//     } else {
//       audioRef.current.play();
//       startTimer();
//     }
//     setIsPlaying(!isPlaying);
//   };

//   useEffect(() => {
//     if (audioRef.current.src !== audioSrc) {
//       audioRef.current.src = audioSrc;
//       setTrackProgress(0);
//       if (isReady.current && isPlaying) {
//         audioRef.current.play();
//         startTimer();
//       }
//     }
//   }, [audioSrc]);

//   useEffect(() => {
//     return () => {
//       audioRef.current.pause();
//       clearInterval(intervalRef.current);
//     };
//   }, []);

//   // const handleNext = () => {
//   //   if (currentIndex < total.length - 1) {
//   //     setCurrentIndex(currentIndex + 1);
//   //   } else {
//   //     setCurrentIndex(0);
//   //   }
//   // };
//   const handleNext = () => {
//     if (currentIndex < total.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//     } else {
//       setCurrentIndex(0);
//     }
  
//     // Check if the current song is playing, if yes, start playing the next song
//     if (isPlaying) {
//       audioRef.current.play();
//       startTimer();
//     }
//   };
  
//   const handlePrev = () => {
//     if (currentIndex - 1 < 0) {
//       setCurrentIndex(total.length - 1);
//     } else {
//       setCurrentIndex(currentIndex - 1);
//     }
//   };

//   const Zero = (n) => {
//     return n > 9 ? "" + n : "0" + n;
//   };

//   const artists = [];
//   currentTrack?.album?.artists.forEach((artist) => {
//     artists.push(artist.name);
//   });

//   return (
//     <div className="player-body flex">
//       <div className="left-player-body">
//         <Progress
//           percentage={currentPercentage}
//           isPlaying={true}
//           size={300}
//           color="skyblue"
//           image={currentTrack?.album?.images[0]?.url}
//         />
//       </div>
//       <div className="right-player-body flex">
//         <p className="song-title">{currentTrack?.name}</p>
//         <p className="song-artists">{artists.join(" | ")}</p>
//         <div className="song-right-bottom flex">
//           <div className="song-duration flex">
//             <p className="duration">0:{Zero(Math.round(trackProgress))}</p>
//             <Animation isPlaying={isPlaying} />
//             <p className="duration">0.30</p>
//           </div>
//           <Control
//             isPlaying={isPlaying}
//             setIsPlaying={setIsPlaying}
//             handleNext={handleNext}
//             handlePrev={handlePrev}
//             handlePlayPause={handlePlayPause}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Music;

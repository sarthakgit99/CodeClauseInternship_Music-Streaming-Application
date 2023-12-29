import React from "react";
import "./circle.css";
const Circle = ({ color, percentage, size, strokeWidth }) => {
  const radius = size / 2 - 10;
  const cir = 2 * Math.PI * radius - 20;
  const strokePct = ((100 - Math.round(percentage)) * cir) / 100;
  return (
    <circle
      r={radius}
      cx="50%"
      cy="50%"
      fill="transparent"
      stroke={strokePct !== cir ? color : ""}
      strokeWidth={strokeWidth}
      strokeDasharray={cir}
      strokeDashoffset={percentage ? strokePct : 0}
      strokeLinecap="round"
    ></circle>
  );
};
const Progress = ({ percentage, isPLaying, size, color,image }) => {
  return (
    <div className="p-circle flex">
      <svg width={size} height={size}>
        <g>
          <Circle strokeWidth={"0.4rem"} color="black" size={size} />
          <Circle
            strokeWidth={"0.5rem"}
            color={color}
            percentage={percentage}
            size={size}
          />
        </g>
        <defs>
          <clipPath id="my-circle">
            <circle cx="50%" cy="50%" r={size / 2 - 30} fill="#ffffff" />
          </clipPath>
          <clipPath id="my-inner-circle">
            <circle cx="50%" cy="50%" r={size / 2 - 100} fill="#ffffff" />
          </clipPath>
        </defs>
        <image
          className={isPLaying ? "active" : ""}
          x={30}
          y={30}
          width={2 * (size / 2 - 30)}
          height={2 * (size / 2 - 30)}
          href="https://pngimg.com/uploads/vinyl/vinyl_PNG95.png"
          clipPath="url(#my-circle)"
        />
        <image
          className={isPLaying ? "active" : ""}
          x={100}
          y={100}
          width={2 * (size / 2 - 100)}
          height={2 * (size / 2 - 100)}
          href={image}
          clipPath="url(#my-inner-circle)"
        />
      </svg>
    </div>
  );
};  
export default Progress;

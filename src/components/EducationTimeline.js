import React from "react";
import "../styles/EducationTimeline.css";

const milestones = ["10th Grade, BTVM", "12th Grade, BTVM", "B.Tech, NITA"];

const EducationTimeline = ({ animate }) => {
  return (
    <div className={`timeline-container ${animate ? "start" : ""}`}>
      <div className="vertical-line"></div>

      {milestones.map((label, index) => (
        <div
          className="timeline-item"
          key={index}
          style={{ top: 40 + index * 60 }}
        >
          <div className="timeline-dot"></div>
          <div className="timeline-label">{label}</div>
        </div>
      ))}
    </div>
  );
};

export default EducationTimeline;

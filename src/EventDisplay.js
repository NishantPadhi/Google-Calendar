import React, { useState, useEffect } from "react";
import "./styles.css";

const getTime = (time) => {
  if (time === 0) {
    return "12:00 AM";
  } else if (time < 10) {
    return `0${time}:00 AM`;
  } else if (time >= 10 && time < 12) {
    return `${time}:00 AM`;
  } else if (time === 12) {
    return `${time}:00 PM`;
  } else if (time - 12 < 10) {
    return `0${time - 12}:00 PM`;
  } else {
    return `${time - 12}:00 PM`;
  }
};

const Line = () => <div className="line"></div>;

const getTimeDurationInMinute = (startTime, endTime) => {
  const [startHour, startMinute] = startTime.split(":");
  const [endHour, endMinute] = endTime.split(":");
  const minute = +endMinute - +startMinute;
  const hour = +endHour - +startHour;
  return {
    timeDuration: hour * 60 + minute,
    start: +startHour * 60 + +startMinute + 24,
  };
};

const timeMaps = {};

const calculateEventHeight = (startTime, endTime, id) => {
  const { timeDuration, start } = getTimeDurationInMinute(startTime, endTime);
  const overlappingTimes = Object.values(timeMaps)?.filter(
    ({ startValue, endValue }) => start >= startValue && start <= endValue
  ).length;
  console.log(overlappingTimes);
  if (!timeMaps[id]) {
    timeMaps[id] = { startValue: start, endValue: start + timeDuration };
  }
  const width = 75 / overlappingTimes;
  const marginLeft = 15 + (overlappingTimes - 1) * 20;
  // console.log(width);
  return {
    width: `${width}%`,
    height: timeDuration,
    marginTop: start,
    marginLeft,
  };
};

const EventBox = ({ title, startTime, endTime, color, id }) => {
  const { height, marginTop, width, marginLeft } = calculateEventHeight(
    startTime,
    endTime,
    id
  );
  return (
    <div
      id="eventBox"
      style={{
        marginLeft: `${marginLeft}%`,
        width,
        top: marginTop,
        height,
        background: color,
        borderRadius: "8px",
        position: "absolute",
        border: "1px solid white",
        display: "flex",
        flexDirection: "column",
        alignItems: "baseline",
        paddingLeft: "4px",
      }}
    >
      <div style={{ color: "white", fontSize: "12px" }}>
        {title}{" "}
        <span style={{ marginLeft: "8px" }}>
          {startTime} - {endTime}
        </span>
      </div>
    </div>
  );
};

const TimeMarker = ({ time }) => {
  return (
    <div
      style={{
        display: "flex",
        alignContent: "center",
        height: "60px",
      }}
    >
      <div
        style={{
          marginRight: "4px",
          marginTop: "-8px",
        }}
      >
        {getTime(time)}
      </div>
      <Line />
    </div>
  );
};

const EventDisplay = ({ events }) => {
  return (
    <div
      style={{
        background: "#ffffff",
        padding: "24px",
        width: "60%",
        margin: "auto",
        marginBottom: "200px",
        height: "600px",
        overflow: "scroll",
        position: "relative",
      }}
    >
      {[...Array(24)].map((_, index) => (
        <TimeMarker time={index} />
      ))}
      {events?.map((eventData) => (
        <EventBox {...eventData} />
      ))}
    </div>
  );
};

export default EventDisplay;

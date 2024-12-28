import React, { useState } from "react";
import "./styles.css";

const Input = ({ createEvent }) => {
  const [title, setTitle] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [color, setColor] = useState("#3863ba");
  const [titleError, setTitleError] = useState("");
  const [startTimeError, setStartTimeError] = useState("");
  const [endTimeError, setEndTimeError] = useState("");
  const [formError, setFormError] = useState("");

  const handleClick = () => {
    if (!title) {
      setTitleError("Please enter title");
    }
    if (!startTime) {
      setStartTimeError("Please set start time");
    }
    if (!endTime) {
      setEndTimeError("Please set end time");
    }
    if (startTime > endTime) {
      setFormError("Start time should be less than or equal to end time.");
    } else if (title && startTime && endTime) {
      console.log(startTime, endTime);
      setTitleError("");
      setStartTimeError("");
      setEndTimeError("");
      setTitle("");
      setEndTime("");
      setStartTime("");
      setColor("#3863ba");
      createEvent({ title, startTime, endTime, color });
    }
  };

  return (
    <div className="modalContent" style={{ gap: "20px" }}>
      <input
        style={{ width: "60%" }}
        placeholder="Enter Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="errorText" style={{ width: "60%" }}>
        {titleError}
      </div>
      <div>
        <label
          style={{ color: "#767676", marginRight: "10px" }}
          for="start-time"
        >
          Choose Start Time:
        </label>
        <input
          style={{ width: "100px" }}
          id="start-time"
          type="time"
          name="start-time"
          min="00:00"
          max="23:59"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </div>
      <div className="errorText">{startTimeError}</div>
      <div>
        <label style={{ color: "#767676", marginRight: "10px" }} for="end-time">
          Choose End Time:
        </label>
        <input
          style={{ width: "100px" }}
          id="end-time"
          type="time"
          name="end-time"
          min="00:00"
          max="23:59"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>
      <div className="errorText">{endTimeError}</div>
      <div>
        <label style={{ color: "#767676", marginRight: "10px" }} for="favcolor">
          Select color for the event:
        </label>
        <input
          type="color"
          id="favcolor"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
      {formError && <div className="errorText">{formError}</div>}
      <button
        className="btn"
        disabled={!title || !startTime || !endTime}
        onClick={handleClick}
      >
        Create Event
      </button>
    </div>
  );
};

export default Input;

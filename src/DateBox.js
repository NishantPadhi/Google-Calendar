import React, { useState } from "react";
import Modal from "./Modal/Modal";
import Input from "./Input";
import EventDisplay from "./EventDisplay";

const dayMapping = {
  0: "MON",
  1: "TUE",
  2: "WED",
  3: "THU",
  4: "FRI",
  5: "SAT",
  6: "SUN",
};

const DateBox = ({ index }) => {
  const [showModal, setShowModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [eventDetails, setEventDetails] = useState([]);

  const handleClickHandler = (e) => {
    setShowModal((prev) => !prev);
  };

  const handleEventModalHandler = (e) => {
    e?.stopPropagation();
    setShowEventModal((prev) => !prev);
  };

  const createEvent = (eventObj) => {
    setShowModal((prev) => !prev);
    setEventDetails([
      ...eventDetails,
      { ...eventObj, id: `key-${eventDetails.length + 1}` },
    ]);
  };

  return (
    <>
      <div
        id={`date-${index}`}
        className={`box ${(index + 1) % 7 ? "" : "border-right-0"}`}
        onClick={handleClickHandler}
      >
        <div>
          <div>{dayMapping[index % 7]}</div>
          {index + 1}
        </div>
        <button onClick={handleEventModalHandler}>See Events</button>
      </div>
      <Modal
        isOpen={showModal}
        onClose={handleClickHandler}
        modalContent={<Input createEvent={createEvent} />}
      />
      <Modal
        isOpen={showEventModal}
        onClose={handleEventModalHandler}
        modalContent={<EventDisplay events={eventDetails} />}
      />
    </>
  );
};

export default DateBox;

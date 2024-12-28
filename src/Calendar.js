import React from "react";
import "./styles.css";
import DateBox from "./DateBox";
const noOfDays = 31;

const Calendar = ({}) => {
  return (
    <div className="card">
      {[...Array(parseInt(noOfDays / 7) + 1)].map((_, rowIndex) => {
        return (
          <div className="flex">
            {[...Array(7)].map((_, colIndex) => {
              const index = rowIndex * 7 + colIndex;
              return index < 31 ? (
                <DateBox index={rowIndex * 7 + colIndex} />
              ) : null;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Calendar;

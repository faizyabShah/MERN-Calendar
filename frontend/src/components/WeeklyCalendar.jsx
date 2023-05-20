import React from 'react';
import './WeeklyCalendar.scss';
import Timeslot from './timeslot';

const WeeklyCalendar = ({ startDate, events }) => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    return date;
  });
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="weekly-calendar">
      <div className="header">
        {weekDays.map((day, index) => (
          <div className="day" >
            <p>{day.getDate()}</p>
            <p>{daysOfWeek[day.getDay()]}</p>
          </div>
        ))}
      </div>
      <div className="body">
        <div className="timeslot">
          {Array.from({ length: 24 }, (_, i) => (
            <div className="hour">
              {i}:00
            </div>
          ))}
        </div>
        {weekDays.map((day, index) => (
          <div className="day">
            <Timeslot dailyEvents={events[day.toDateString()] || []} showTimes={false} hours={hours}></Timeslot>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyCalendar;

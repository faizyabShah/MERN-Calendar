import React, {useEffect, useState} from 'react';
import './DailyCalendar.scss';
import Timeslot from './timeslot';

const DailyCalendar = ({ date, events }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const formattedDate = date.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const [dailyEvents, setDailyEvents] = useState([]);

  let _events = [];

  useEffect(() => {
    const today = (new Date().toDateString());
    const todayEvents = events[today];
    setDailyEvents(todayEvents || []);
  })

  return (
    <div className="daily-calendar">
      <h2>{formattedDate}</h2>
      <Timeslot
        dailyEvents={dailyEvents}
        hours={hours}
      ></Timeslot>
      {/* Additional content or events can be added here */}
    </div>
  );
};

export default DailyCalendar;

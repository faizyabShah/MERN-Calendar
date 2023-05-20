import React from 'react';
import './MonthlyCalendar.scss';

const MonthlyCalendar = ({ month, year, events }) => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const totalDays = new Date(year, month, 0).getDate();
  const firstDay = new Date(year, month - 1, 1).getDay();
  const weeksInMonth = Math.ceil((totalDays + firstDay) / 7);

  const weeksInMonthWithDays = Array.from({ length: weeksInMonth }, (_, i) => {
    const week = Array.from({ length: 7 }, (_, j) => {
      const day = i * 7 + j - firstDay + 1;
      return day > 0 && day <= totalDays ? day : null;
    });
    return week;
  });



  return (
    <div className="monthly-calendar">
      <h2>{`${month}/${year}`}</h2>
      <div className="calendar-grid">
        <div className="header">
          {/* <div className="row"> */}
          {daysOfWeek.map(day => (
            <div className="day">
              {day}
            </div>
          ))}
          {/* </div> */}
        </div>
        <div className="body">
          {weeksInMonthWithDays.map((week, i) => (
            // <div className="row" >
            <>
              {week.map(day => (
                day != null ? (
                  <div className="day">
                    {day}
                    {
                      console.log((new Date(`${month}/${day}/${year}`)).toDateString(), events[(new Date(`${month}/${day}/${year}`)).toDateString()])
                      }
                    {
                      events[(new Date(`${month}/${day}/${year}`)).toDateString()]?.map(e => (
                        <div className={'event ' + (e.type.toLowerCase())}>
                          <span>{e.name}</span>
                          <span>{e.type}</span>
                          <span>{(new Date(e.held)).toLocaleTimeString()}</span>
                        </div>
                      ))
                    }
                  </div>
                ) : (
                  <div className="day empty" ></div>
                )
                
              ))}
            </>)
            )
            }
        </div>
      </div>
    </div>

  );
};

export default MonthlyCalendar;

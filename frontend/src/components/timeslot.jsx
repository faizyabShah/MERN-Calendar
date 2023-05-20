import React from 'react'

export default function Timeslot({hours, dailyEvents, showTimes}) {
  return (
    <div className="timeslots">
      {hours.map(hour => (
        <div className="timeslot">
          {showTimes !== false ? <div className="hour">{hour}:00</div> : null}
          {
            dailyEvents.map(e => (<>
              {hour === (new Date(e.held)).getHours() ? 
              <div className={'event ' + (e.type.toLowerCase())}>
                <span>{e.name}</span>
                <span>{e.type}</span>
                <span>{(new Date(e.held)).toLocaleTimeString()}</span>
              </div> : null}</>
            ))
          }
        </div>
      ))}
    </div>
  )
}

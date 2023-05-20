import { useState, useEffect } from "react";
import MonthlyCalendar from "./components/MontlyCalendar.jsx";
import WeeklyCalendar from "./components/WeeklyCalendar.jsx";
import DailyCalendar from "./components/DailyCalendar.jsx";
import AddEventModal from "./components/AddEventModal.js";
import "./App.scss";

function App() {
  const [type, setType] = useState("monthly");
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [startDate, setStartDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState([]);
  const handleClose = () => setShowModal(false);

  const handleClick = (e) => {
    setType(e.target.innerText.toLowerCase());
    e.target.classList.add("active");
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
      if (button.innerText.toLowerCase() !== e.target.innerText.toLowerCase()) {
        button.classList.remove("active");
      }
    });
  };

  const handleShowModal = (e) => {
    setShowModal(true);
  };

  const handleNext = () => {
    if (type == "monthly") {
      if (month == 12) {
        setMonth(1);
        setYear(year + 1);
      } else {
        setMonth(month + 1);
      }
    } else if (type == "weekly") {
      setStartDate(new Date(startDate.setDate(startDate.getDate() + 7)));
    } else if (type == "daily") {
      setStartDate(new Date(startDate.setDate(startDate.getDate() + 1)));
    }
  };

  const handlePrevious = () => {
    if (type == "monthly") {
      if (month == 1) {
        setMonth(12);
        setYear(year - 1);
      } else {
        setMonth(month - 1);
      }
    } else if (type == "weekly") {
      setStartDate(new Date(startDate.setDate(startDate.getDate() - 7)));
    } else if (type == "daily") {
      setStartDate(new Date(startDate.setDate(startDate.getDate() - 1)));
    }
  };

  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/calendar");
        const data = await response.json();
        // setEvents(data);
        //convert events array to object with date as key and event as value
        const _events = {};
        for (let event of data) {
          let key = new Date(event.held).toDateString();
          _events[key] =
            _events[key] instanceof Array ? [..._events[key], event] : [event];
        }
        setEvents(_events);
        console.log(_events);
        console.log(data);
      } catch (err) {
        console.error(err.message);
      }
    };
    getEvents();
  }, []);

  return (
    <div className="app">
      <div className="otherstuff">
        <button className="active" onClick={(e) => handleClick(e)}>
          Monthly
        </button>
        <button className="" onClick={(e) => handleClick(e)}>
          Weekly
        </button>
        <button className="" onClick={(e) => handleClick(e)}>
          Daily
        </button>
        <button onClick={handleShowModal}>Add Event</button>
      </div>
      <div className="calendar">
        {type == "monthly" ? (
          <MonthlyCalendar month={month} year={year} events={events} />
        ) : type == "daily" ? (
          <DailyCalendar date={startDate} events={events} />
        ) : type == "weekly" ? (
          <WeeklyCalendar startDate={startDate} events={events} />
        ) : (
          <></>
        )}
        <div className="otherstuff">
          <button onClick={handlePrevious}>Previous</button>
          <button onClick={handleNext}>Next</button>
        </div>
      </div>

      {showModal ? (
        <AddEventModal
          setEvents={setEvents}
          events={events}
          handleClose={handleClose}
        />
      ) : null}
    </div>
  );
}

export default App;

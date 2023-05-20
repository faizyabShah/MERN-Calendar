import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./my.scss";

function AddEventModal({ handleClose, setEvents, events }) {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    dateTime: "",
    type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDateTimeChange = (date) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      dateTime: date,
    }));
  };

  const handleConfirm = async (e) => {
    await addEvent(e);
    handleClose();
  };

  const addEvent = async (e) => {
    e.preventDefault();
    const { name, location, dateTime, type } = formData;
    const body = { name, location, held: dateTime.toGMTString(), type };
    try {
      const response = await fetch("http://localhost:5000/api/calendar/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (response.ok) {
        const _events = { ...events };
        _events[dateTime.toDateString()] =
          _events[dateTime.toDateString()] instanceof Array
            ? [..._events[dateTime.toDateString()], body]
            : [body];

        console.log(_events);
        setEvents(_events);
      }
      console.log(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Donate</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
        />
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          placeholder="Enter Location"
          value={formData.location}
          onChange={handleChange}
        />
        <label htmlFor="dateTime">Time and Date:</label>
        <DatePicker
          id="dateTime"
          name="dateTime"
          selected={formData.dateTime}
          onChange={handleDateTimeChange}
          showTimeSelect
          dateFormat="Pp"
          timeIntervals={60}
        />
        <label htmlFor="type">Type:</label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
        >
          <option value="">Select Type</option>
          <option value="Work">Work</option>
          <option value="Study">Study</option>
          <option value="Leisure">Leisure</option>
        </select>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddEventModal;

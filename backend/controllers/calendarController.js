const { Calendar } = require("../models/calendarModel");

const addEvent = async (req, res) => {
  const { name, type, location, created, held } = req.body;
  try {
    const event = await Calendar.create({
      name,
      type,
      location,
      created,
      held,
    });
    res.status(201).json({ event });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const getAllEvents = async (req, res) => {
  const events = await Calendar.find();
  res.status(200).json(events);
};

module.exports = { addEvent, getAllEvents };

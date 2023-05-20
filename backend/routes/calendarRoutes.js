const express = require("express");
const { addEvent, getAllEvents } = require("../controllers/calendarController");
router = express.Router();

//login route

router.post("/add", addEvent);
router.get("/", getAllEvents);

module.exports = router;

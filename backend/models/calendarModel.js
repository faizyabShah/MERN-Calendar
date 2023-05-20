const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const calendarSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    created: {
      type: Date,
      default: Date.now,
    },
    held: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  { timeStamps: true }
);

let Calendar = mongoose.model("Calendar", calendarSchema);
module.exports = { Calendar };

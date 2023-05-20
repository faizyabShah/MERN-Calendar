const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const calendarRoute = require("./routes/calendarRoutes");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Access-Control-Allow-Origin",
      "Content-Type",
      "Authorization",
    ],
  })
);

app.use("/api/calendar", calendarRoute);

dbURI =
  "mongodb+srv://faizyabshah0123:donateforacause@donationapp.vb53grx.mongodb.net/calendarDB?retryWrites=true&w=majority";
port = 5000;

mongoose
  .connect(dbURI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Connected to DB and listening for requests on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

const express = require("express");
const userModel = require("../model/userModel");
const hallModel = require("../model/hallModel");
const adminModel = require("../model/adminModel");
const router = express.Router();

//before hall booking user can check halls name, price, amenities and other details on http://localhost:4000/user/halls ,
// so this is not showing booked and not booked details. only showing all offering halls and specialities like AC, DJ...

router.get("/halls", async (req, res) => {
  try {
    console.log("halls", req.body);
    const allHalls = await adminModel.find();
    if (allHalls) {
      return res.send(allHalls).json();
    }
  } catch (error) {
    res.status(400);
    // .send({message: "Failed to fetching halls details."}).json(error)
  }
});

//this is for new hall booking on http://localhost:4000/user/book-hall, while booking if the hall is booked already, system not allows user to book the same hall on same date,
// so system return message like "hall is booked by another customer, so please choose another hall/day". otherwise if booking successfull, system show message "Hall successfully booked".

router.post("/book-hall", async (req, res) => {
  try {
    console.log("book-hall", req.body);

    // Get the requested hall ID
    const requestedHallId = req.body.roomId;
    console.log(requestedHallId);

    // Check if the hall ID is valid
    if (requestedHallId > 4) {
      return res.status(400).send({
        message: "Invalid hall ID. Please choose a valid hall.",
      });
    }

    // Check if the hall is already booked on the requested date
    const existingBooking = await userModel.findOne({
      roomId: requestedHallId,
      date: req.body.date,
    });

    if (existingBooking) {
      return res.status(400).send({
        message:
          "Hall already booked by another customer on the same date. Please choose another hall/day.",
      });
    } else {
      const newBookingDate = new Date(req.body.date);
      const newBooking = new userModel({
        ...req.body,
        verified: true,
        true: newBookingDate,
      });
      console.log("New booking status:", newBooking);
      await newBooking.save();
      res.send("Hall successfully booked.");
    }
  } catch (error) {
    console.error("Error in booking hall:", error);
    res
      .status(500)
      .send({
        message: "Failed to book a hall at this time. Try another day/hall.",
      });
  }
});

//once hall booked by user, user can check the status on http://localhost:4000/user/booked-status

router.get("/booked-status", async (req, res) => {
  try {
    console.log("User booked status.");
    const bookedHalls = await userModel.find();
    console.log("Booked Halls details:", bookedHalls);

    // const allHalls = await adminModel.find()
    // console.log("All Halls details:", allHalls)

    const bookedHallDetails = bookedHalls.map((booked) => ({
      hall_Id: booked.roomId,
      name: booked.name,
      date: booked.date,
      time: booked.time,
    }));

    res.json({
      bookedHalls: bookedHallDetails,
      // notBookedHalls: notBookedHalls
    });
  } catch (error) {
    console.log("Error fetching hall statius:", error);
    res.status(400).json(error);
  }
});

module.exports = router;

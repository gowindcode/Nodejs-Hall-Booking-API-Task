const express = require("express");
const hallModel = require("../model/hallModel");
const userModel = require("../model/userModel");
const adminModel = require("../model/adminModel");
const router = express.Router();

//user or admin can ckeck all halls offering details on http://localhost:4000/hall/details

router.get("/details", async (req, res) => {
  try {
    console.log("Hall details.");
    const hallsList = await adminModel.find();
    res.send(hallsList);
  } catch (error) {
    res.status(400).json(error);
  }
});

// in this user or admin can ckeck the status of halls on http://localhost:4000/hall/status,
// so this will show booked halls details like "hall_id, hall_name, reserved_date, reserved_time" like wise.
//  And showing not booked halls id, amenities, price per hour, so user can get to know the details of not booked halls.

router.get("/status", async (req, res) => {
  try {
    console.log("Status.");
    const bookedHalls = await userModel.find();
    console.log("Booked Halls details:", bookedHalls);

    const allHalls = await adminModel.find();
    console.log("All Halls details:", allHalls);

    const bookedHallDetails = bookedHalls.map((booked) => ({
      hall_Id: booked.roomId,
      hall_name: booked.name,
      reserved_date: booked.date,
      reserved_time: booked.time,
    }));
    // const bookedHalls = hallsList.filter(hall => hall.booked)
    const notBookedHalls = allHalls
      .filter((hall) => {
        return !bookedHalls.some(
          (booking) => booking.roomId && booking.roomId === hall.id
        );
      })
      .map((availableHall) => ({
        available_hall_Id: availableHall.id,
        hall_amenities: availableHall.amenities,
        hall_price_hour: availableHall.price,
      }));
    console.log("Not booked Halls details:", notBookedHalls);
    res.json({
      bookedHalls: bookedHallDetails,
      notBookedHalls: notBookedHalls,
    });
  } catch (error) {
    console.log("Error fetching hall statius:", error);
    res.status(400).json(error);
  }
});

module.exports = router;

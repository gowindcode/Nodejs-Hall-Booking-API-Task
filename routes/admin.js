const express = require("express");
const hallModel = require("../model/hallModel");
const adminModel = require("../model/adminModel");
const userModel = require("../model/userModel");
const router = express.Router();

//this is for admin create a new hall

router.post("/create-hall", async (req, res) => {
  try {
    console.log("create hall");
    const halls = new adminModel(...req.body);
    await halls.save();
    res.send("Hall created successfully.");
  } catch (error) {
    res.status(400).send({ message: "Failed to create Hall." });
  }
});

//once admin creted hall, he/her can check the halls details

router.get("/halls", async (req, res) => {
  try {
    const halls = await adminModel.find();
    res.send(halls);
  } catch (error) {
    res.status(400).send({ message: "Data not found." });
  }
});

//admin can get all customer details (user name, phone number, date , time...) on http://localhost:4000/admin/all-customers ,
// if supposed the customer booked hall admin get details (hall id, hall name and customer details.)

router.get("/all-customers", async (req, res) => {
  try {
    const allCustomers = await userModel.find();
    console.log(allCustomers);
    res.send(allCustomers);
  } catch (error) {
    res.status(400).send({ message: "Data not found." });
  }
});

//admin can get booked details (hall id, hall name, user name, phone number, date , time...) on http://localhost:4000/admin/booked-details

router.get("/booked-details", async (req, res) => {
  try {
    const bookedHalls = await userModel.find({
      roomId: { $exists: true, $ne: null },
    });
    console.log("Booked Halls details:", bookedHalls);

    res.json({
      bookedHalls: bookedHalls,
    });
  } catch (error) {
    console.log("Error fetching hall status:", error);
    res.status(400).json(error);
  }
});

// admin can get user details on http://localhost:4000/admin/phone (http://localhost:4000/admin/8181898989)  using phone number, because it is unique
// admin can get user details on http://localhost:4000/admin/name (http://localhost:4000/admin/Ajith) using name, but it is unique or not unique, so phone number search is best to get exact details

router.get("/:identifier", async (req, res) => {
  try {
    const identifier = req.params.identifier;

    console.log(req.params, identifier);

    // Check if the identifier is a number (phone number)
    if (!isNaN(identifier)) {
      const userBookingsByPhone = await userModel.find({
        phone: identifier,
      });
      if (userBookingsByPhone.length > 0) {
        res.send(userBookingsByPhone);
      } else {
        res
          .status(404)
          .send({
            message: "No bookings found for the provided phone number.",
          });
      }
    } else {
      // If it's not a number, then assume it's a name
      const userBookingsByName = await userModel.find({
        name: identifier,
      });
      if (userBookingsByName.length > 0) {
        res.send(userBookingsByName);
      } else {
        res
          .status(404)
          .send({ message: "No bookings found for the provided name." });
      }
    }
  } catch (error) {
    console.log("Error", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//once hall booked by user, admin can check the status on http://localhost:4000/admin/booked-status

router.get("/booked-status", async (req, res) => {
  try {
    console.log("Admin viewing user booked status.");
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

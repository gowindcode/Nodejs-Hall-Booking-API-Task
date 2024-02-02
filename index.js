const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const mongoose = require("mongoose");
const hallRoute = require("./routes/hall");
const userRoute = require("./routes/user");
const adminRoute = require("./routes/admin");
const { prototype } = require("yallist");

const app = express();
const PORT = 4000;
app.use(express.json());
app.use(cors());

app.get("/", function (req, res) {
  res.send("Hello viewer, I am hall booking server running successfully 😊.");
});

app.use("/hall", hallRoute);
app.use("/user", userRoute);
app.use("/admin", adminRoute);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Mongoose is connected successfully ✔.");
    app.listen(PORT, () =>
      console.log("Server started successfully at PORT:", PORT)
    );
  })
  .catch((error) => {
    console.log("Error to connet server: ✖", error);
  });

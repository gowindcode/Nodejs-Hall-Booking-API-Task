const mongoose = require("mongoose");

//structure schema

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    roomId: { type: Number, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    address: { type: String, required: true },
    reference: { type: String, required: true },
    verified: { type: Boolean, required: true },
    role: {
      type: String,
      required: true,
      default: "user",
      enum: ["user", "admin"],
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;

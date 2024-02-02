const mongoose = require("mongoose");

//structure schema

const hallSchema = mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  amenities: { type: String, required: true },
  price: { type: Number, required: true },
  verified: { type: Boolean, required: true },
  role: {
    type: String,
    required: true,
    default: "user",
    enum: ["admin", "user"],
  },
});

const hallModel = mongoose.model("hall", hallSchema);
module.exports = hallModel;

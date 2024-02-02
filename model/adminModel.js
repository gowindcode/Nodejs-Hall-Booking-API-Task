const mongoose = require("mongoose");

//structure schema

const adminSchema = mongoose.Schema(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    amenities: { type: Array, required: true },
    seats: { type: Number, required: true },
    price: { type: Number, required: true },
    details: { type: String, required: true },
    // verified: {type: Boolean, required: true},
    // role: {type: String, required, default: "admin", enum: ["admin"]},
  },
  { timestamps: true }
);

const adminModel = mongoose.model("admin", adminSchema);
module.exports = adminModel;

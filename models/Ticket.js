const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: false,
      trim: true,
      unique: true,
    },
    phone: {
      type: String,
      require: true,
      trim: true,
      unique: true,
    },
    to: {
      type: String,
      require: true,
      trim: true,
    },
    from: {
      type: String,
      require: true,
      trim: true,
    },
    seatNumber: {
      type: String,
      require: true,
      trim: true,
    },
    dateTime: {
      type: String,
      require: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;

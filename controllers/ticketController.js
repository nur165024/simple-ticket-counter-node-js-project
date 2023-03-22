const Ticket = require("../models/Ticket");

// get all tickets
const getAllTicket = async (req, res) => {
  try {
    const ticket = await Ticket.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      data: ticket,
      message: "success",
    });
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          message: error.message,
        },
      },
    });
  }
};

// create tickets
const singleCreateTicket = async (req, res) => {
  try {
    let ticket = new Ticket({ ...req.body });
    await ticket.save();

    res.status(201).json({
      message: "Ticket created Successfully",
    });
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          message: error.message,
        },
      },
    });
  }
};

// bulk create tickets
const bulkCreateTickets = async (req, res) => {
  try {
    await Ticket.insertMany(req.body);

    res.status(201).json({
      message: "Tickets created Successfully",
    });
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          message: error.message,
        },
      },
    });
  }
};

// bulk update tickets
const bulkUpdateTickets = async (req, res) => {
  try {
    await Ticket.updateMany(
      { _id: req.body.ids },
      { $set: req.body.data },
      { multi: true }
    );

    res.status(201).json({
      message: "Tickets updated Successfully",
    });
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          message: error.message,
        },
      },
    });
  }
};

// bulk delete tickets
const bulkDeleteTickets = async (req, res) => {
  try {
    await Ticket.deleteMany({ _id: req.body.ids });

    res.status(200).json({
      message: "Tickets Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          message: error.message,
        },
      },
    });
  }
};

// search tickets {name, phone, email,seat number, to, from}
const searchTickets = async (req, res) => {
  try {
    const { name, phone, email, seatNumber, to, from } = req.query;

    let queryObject = {};

    if (name) {
      queryObject.name = { $regex: `${name}`, $options: "i" };
    } else if (phone) {
      queryObject.phone = { $regex: `${phone}`, $options: "i" };
    } else if (email) {
      queryObject.email = { $regex: `${email}`, $options: "i" };
    } else if (seatNumber) {
      queryObject.seatNumber = { $regex: `${seatNumber}`, $options: "i" };
    } else if (to) {
      queryObject.to = { $regex: `${to}`, $options: "i" };
    } else if (from) {
      queryObject.from = { $regex: `${from}`, $options: "i" };
    }

    const searchTicket = await Ticket.find(queryObject).sort({ createdAt: -1 });

    res.status(200).json({
      data: searchTicket,
      message: "Success",
    });
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          message: error.message,
        },
      },
    });
  }
};

// get single ticket
const getSingleTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    res.status(200).json({
      data: ticket,
      message: "Success",
    });
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          message: error.message,
        },
      },
    });
  }
};

// single ticket update
const singleTicketUpdate = async (req, res) => {
  try {
    await Ticket.findOneAndUpdate({ _id: req.params.id }, { ...req.body });

    res.status(201).json({
      message: "Ticket updated successfully!",
    });
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          message: error.message,
        },
      },
    });
  }
};

// single ticket delete
const singleTicketDelete = async (req, res) => {
  try {
    await Ticket.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Ticket deleted Successfully!",
    });
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          message: error.message,
        },
      },
    });
  }
};

module.exports = {
  getAllTicket,
  singleCreateTicket,
  bulkCreateTickets,
  bulkUpdateTickets,
  bulkDeleteTickets,
  searchTickets,
  getSingleTicket,
  singleTicketUpdate,
  singleTicketDelete,
};

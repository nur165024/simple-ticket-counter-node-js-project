const {
  getAllTicket,
  singleCreateTicket,
  bulkCreateTickets,
  bulkUpdateTickets,
  bulkDeleteTickets,
  searchTickets,
  getSingleTicket,
  singleTicketUpdate,
  singleTicketDelete,
} = require("../controllers/ticketController");
const router = require("express").Router();

// ticket create & get
router.route("/").get(getAllTicket).post(singleCreateTicket);

// bulk create & update & delete
router
  .route("/bulk")
  .post(bulkCreateTickets)
  .put(bulkUpdateTickets)
  .delete(bulkDeleteTickets);

// search by username, mail
router.get("/search", searchTickets);

// find by id get & update & delete
router
  .route("/:id")
  .get(getSingleTicket)
  .put(singleTicketUpdate)
  .delete(singleTicketDelete);

module.exports = router;

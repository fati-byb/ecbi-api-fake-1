const router = require('express').Router();

const reservationController = require("../controllers/reservation/reservation.controller");

router.post('/add-reservation', reservationController.createReservation);
router.get('/get-reservation', reservationController.getReservations);
// router.put('/updateReservationStatus/:id', reservationController.updateReservationStatus);
router.put('/updateReservation/:id', reservationController.updateReservation);
router.delete('/delete/:id', reservationController.deleteReservation);
module.exports = router;

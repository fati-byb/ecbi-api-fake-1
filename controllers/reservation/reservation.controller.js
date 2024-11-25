const Reservation = require("../../models/reservation.model");
const WeeklyScheet = require('../../models/shift.model');
const GlobalSettings = require('../../models/setting.model');
const moment = require('moment');
const dayjs = require('dayjs');


const reservationController = {};
 // Get current time
 const today = dayjs().startOf('day'); // Start of today for comparison
 const currentTime = dayjs();
// Function to get the day of the week
const getDayOfWeek = (dateString) => {
  const date = new Date(dateString);
  const days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
  return days[date.getDay()];
};

reservationController.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate("table");

    // Populate shift details from WeeklyScheet
    const populatedReservations = await Promise.all(reservations.map(async reservation => {
      const scheet = await WeeklyScheet.findOne({ "shifts._id": reservation.shiftId });
      const shift = scheet.shifts.id(reservation.shiftId); // Get the shift details

      return {
        ...reservation.toObject(),
        shift: shift ? {
        _id:shift._id,
          name: shift.name,
          openingTime: shift.openingTime,
          closingTime: shift.closingTime
        } : null
      };
    }));

    res.json(populatedReservations);
  } catch (err) {
    res.json({ error: 'Failed to fetch reservations', details: err.message });
  }
};


//CHANGEMENT

reservationController.createReservation = async (req, res) => {
  try {
    const { firstname, lastname, date, time, phone, email, shiftName, peopleCount } = req.body;

     // Vérifiez que peopleCount est supérieur à 0
     if (peopleCount <= 0) {
      return res.status(400).json({ message: "Invalid reservation: people count must be greater than 0." });
    }


    const selectedDay = getDayOfWeek(date);

    // Récupérer les paramètres globaux
    const globalSettings = await GlobalSettings.findOne();
    if (!globalSettings) {
      return res.status(500).json({ message: "Global settings not found." });
    }
    const { reservationInterval, maxPeoplePerInterval } = globalSettings;
    console.log("Retrieved Reservation Interval:", reservationInterval);
    console.log("Retrieved Reservation Interval:", maxPeoplePerInterval);

    // Trouver le WeeklyScheet correspondant au jour
    const scheet = await WeeklyScheet.findOne({ dayname: selectedDay });
    if (!scheet) {
      return res.status(404).json({ message: "No schedule found for the selected day." });
    }

    if (!scheet.isopen) {
      return res.status(400).json({ message: "Reservations are not allowed on this day." });
    }

    // Trouver le shift correspondant
    const shift = scheet.shifts.find(s => s.name === shiftName);
    if (!shift) {
      return res.status(404).json({ message: "No shift found with the provided name." });
    }

    // Vérifier si l'heure de réservation demandée est valide dans l'intervalle
    const openingTime = moment(shift.openingTime, 'HH:mm');
    const closingTime = moment(shift.closingTime, 'HH:mm');   
    const requestedTime = moment(time, 'HH:mm');

    if (requestedTime.isBefore(openingTime) || requestedTime.isAfter(closingTime)) {
      return res.status(400).json({ message: "Invalid reservation time." });
    }

    // Check if requested time is in the future or is now
    // if (inputDate.isSame(today, 'day') && requestedTime.isBefore(currentTime)) {
    //   return res.status(400).json({ message: "Reservation time must be now or in the future." });
    // }

    // const intervalStart = openingTime.clone().add(Math.floor(requestedTime.diff(openingTime, 'minutes') / reservationInterval) * reservationInterval, 'minutes');
    // // Calculer le créneau correspondant pour `requestedTime`
    
    // const intervalEnd = intervalStart.clone().add(reservationInterval, 'minutes');


if (inputDate.isSame(today, 'day') && requestedTime.isBefore(currentTime)) {
  return res.status(400).json({ message: "Reservation time must be now or in the future." });
}

const intervalStart = openingTime.clone().add(
  Math.floor(requestedTime.diff(openingTime, 'minutes') / reservationInterval) * reservationInterval,
  'minutes'
);

const intervalEnd = intervalStart.clone().add(reservationInterval, 'minutes');

    // Calculer le créneau correspondant pour `requestedTime`
    
 
    // Compter le nombre total de personnes déjà réservées dans cet intervalle
    const peopleAlreadyReserved = await Reservation.aggregate([
      {
        $match: {
          date: date,
          shiftId: shift._id,
          time: { $gte: intervalStart.format('HH:mm'), $lt: intervalEnd.format('HH:mm') }
        }
      },
      {
        $group: {
          _id: null,
          totalPeople: { $sum: "$peopleCount" }
        }
      }
    ]);

    const totalPeopleReserved = peopleAlreadyReserved.length > 0 ? peopleAlreadyReserved[0].totalPeople : 0;
console.log('total',totalPeopleReserved,'people count',peopleCount,'maxPeople',maxPeoplePerInterval)
    // Vérifier si le nombre total de personnes dépasse `maxPeoplePerInterval`
    if (totalPeopleReserved + peopleCount > maxPeoplePerInterval) {
      return res.status(400).json({ message: `Cannot create reservation: maximum people for this interval reached.` });
    }

    // Créer la nouvelle réservation
    const newReservation = new Reservation({
      firstname,
      lastname,
      date,
      time: intervalStart.format('HH:mm'),
      phone,
      email,
      shiftId: shift._id,     
      peopleCount
    });

    const reservation = await newReservation.save();
    res.status(201).json({ success: true, data: reservation });
  } catch (err) {
    console.error('Error details:', err);
    res.status(500).json({ error: 'Failed to create reservation', details: err.message });
  }
};



// Update a reservation
reservationController.updateReservation = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const reservation = await Reservation.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

    if (!reservation) {
      return res.json({ message: 'Reservation not found' });
    }

    res.status(200).json(reservation);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Delete a reservation
reservationController.deleteReservation = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Reservation.findByIdAndDelete(id);

    if (!result) {
      return res.json({ message: 'Reservation not found' });
    }

    return res.status(200).json({ message: 'Reservation deleted successfully', id });
  } catch (error) {
    return res.json({ message: 'Error deleting reservation', error: error.message });
  }
};

module.exports = reservationController;

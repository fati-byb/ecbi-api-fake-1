// const WeeklyScheet = require("../../models/shift.model");

// // Créer une nouvelle carte d'horaires (weeklyscheet)
// const WeeklyScheetController = {};

// WeeklyScheetController.getAllWeeklyScheets = async (req, res) => {
//     try {
//       const weeklyScheets = await WeeklyScheet.find(); 
//       res.status(200).json(weeklyScheets);
//     } catch (error) {
//       res.json({ message: "Erreur lors de la récupération des cartes d'horaires", error });
//     }
//   };

// WeeklyScheetController.createWeeklyScheet = async (req, res) => {
//   const { dayname, isopen, shifts } = req.body;

//   // Validation des entrées
//   if (!dayname || !shifts || shifts.length === 0) {
//     return res.json({ message: 'Le nom du jour et au moins un shift sont requis.' });
//   }

//   try {
   
//     const newScheet = new WeeklyScheet({
//       dayname,
//       isopen,
//       shifts
//     });

   
//     const savedScheet = await newScheet.save();

    
//     res.status(201).json(savedScheet);
//   } catch (error) {
   
//     res.json({ message: 'Erreur lors de la création de la carte', error });
//   }
// };




// WeeklyScheetController.updateWeeklyScheet = async (req, res) => {
//     try {
//       const { id } = req.params; 
//       const { dayname, isopen, shifts } = req.body; 
  
//       // Chercher la carte WeeklyScheet par ID
//       const weeklyScheet = await WeeklyScheet.findById(id);
//       if (!weeklyScheet) {
//         return res.json({ message: "WeeklyScheet non trouvée" });
//       }
  
      
//       if (dayname !== undefined) {
//         weeklyScheet.dayname = dayname; 
//       }
//       if (isopen !== undefined) {
//         weeklyScheet.isopen = isopen; 
//       }
  
    
//       if (shifts) {
//         shifts.forEach(newShift => {
//           const existingShift = weeklyScheet.shifts.id(newShift._id);
//           if (existingShift) {
          
//             existingShift.name = newShift.name || existingShift.name;
//             existingShift.openingTime = newShift.openingTime || existingShift.openingTime;
//             existingShift.closingTime = newShift.closingTime || existingShift.closingTime;
//             existingShift.reservationInterval = newShift.reservationInterval || existingShift.reservationInterval;
//             existingShift.maxPeoplePerInterval = newShift.maxPeoplePerInterval || existingShift.maxPeoplePerInterval;
//           } else {
//             // Ajouter un nouveau shift si l'ID n'existe pas
//             weeklyScheet.shifts.push(newShift);
//           }
//         });
//       }
  
     
//       await weeklyScheet.save();
//       res.status(200).json(weeklyScheet);
//     } catch (error) {
//       res.status(500).json({ message: "Erreur serveur", error });
//     }
//   };

//   // Fonction pour ajouter un shift à une feuille horaire existante
// WeeklyScheetController.addShift = async (req, res) => {
//   const { scheetId } = req.params; // ID de la feuille horaire
//   const { name, openingTime, closingTime, reservationInterval, maxPeoplePerInterval } = req.body; // Détails du nouveau shift

//   // Validation des entrées
//   if (!name || !openingTime || !closingTime || !reservationInterval || !maxPeoplePerInterval) {
//       return res.json({ message: 'Tous les champs sont requis.' });
//   }

//   try {
//       // Chercher la feuille horaire par ID
//       const scheet = await WeeklyScheet.findById(scheetId);
//       if (!scheet) {
//           return res.json({ message: "Feuille horaire non trouvée" });
//       }

//       // Création du nouveau shift
//       const newShift = {
//           name,
//           openingTime,
//           closingTime,
//           reservationInterval,
//           maxPeoplePerInterval
//       };

//       // Ajouter le nouveau shift à la liste des shifts
//       scheet.shifts.push(newShift);

//       // Sauvegarder les modifications
//       await scheet.save();

//       return res.status(201).json({ message: "Shift ajouté avec succès", scheet });
//   } catch (error) {
//       return res.json({ message: "Erreur du serveur", error: error.message });
//   }
// };


//   // Fonction pour supprimer un shift par son ID
//   WeeklyScheetController.deleteShift = async (req, res) => {
//     const { scheetId, shiftId } = req.params;
  
//     try {
//       // Trouver la feuille horaire par son ID
//       const scheet = await WeeklyScheet.findById(scheetId);
  
//       if (!scheet) {
//         return res.json({ message: "Feuille horaire non trouvée" });
//       }
  
//       // Supprimer le shift du tableau des shifts en filtrant celui avec le shiftId
//       scheet.shifts = scheet.shifts.filter(shift => shift._id.toString() !== shiftId);
  
//       // Sauvegarder les modifications
//       await scheet.save();
  
//       return res.status(200).json({ message: "Shift supprimé avec succès", scheet });
//     } catch (error) {
//       return res.json({ message: "Erreur du serveur", error: error.message });
//     }
//   };
  


// module.exports = WeeklyScheetController;




const mongoose = require('mongoose');
const WeeklyScheet = require("../../models/shift.model");

const WeeklyScheetController = {};

// Récupérer toutes les cartes d'horaires
WeeklyScheetController.getAllWeeklyScheets = async (req, res) => {
  try {
    const weeklyScheets = await WeeklyScheet.find();
    res.status(200).json(weeklyScheets);
  } catch (error) {
    res.json({ message: "Erreur lors de la récupération des cartes d'horaires", error });
  }
};

// Créer une nouvelle carte d'horaires
WeeklyScheetController.createWeeklyScheet = async (req, res) => {
  const { dayname, isopen, shifts} = req.body;

  if (!dayname || !shifts || shifts.length === 0) {
    return res.json({ message: 'Le nom du jour, les shifts et les paramètres globaux sont requis.' });
  }

  try {
    const newScheet = new WeeklyScheet({
      dayname,
      isopen,
      shifts
    });

    const savedScheet = await newScheet.save();
    res.status(201).json(savedScheet);
  } catch (error) {
    res.json({ message: 'Erreur lors de la création de la carte', error });
  }
};

// Mettre à jour une carte d'horaires
WeeklyScheetController.updateWeeklyScheet = async (req, res) => {
  const { id } = req.params;
  const { dayname, isopen, shifts} = req.body;

  try {
    const weeklyScheet = await WeeklyScheet.findById(id);
    if (!weeklyScheet) {
      return res.json({ message: "WeeklyScheet non trouvée" });
    }

    // Mettre à jour les champs globaux
    if (dayname !== undefined) weeklyScheet.dayname = dayname;
    if (isopen !== undefined) weeklyScheet.isopen = isopen;
    // if (reservationInterval !== undefined) weeklyScheet.reservationInterval = reservationInterval;
    // if (maxPeoplePerInterval !== undefined) weeklyScheet.maxPeoplePerInterval = maxPeoplePerInterval;

    // Mettre à jour les shifts
    if (shifts) {
      shifts.forEach(newShift => {
        const existingShift = weeklyScheet.shifts.id(newShift._id);
        if (existingShift) {
          existingShift.name = newShift.name || existingShift.name;
          existingShift.openingTime = newShift.openingTime || existingShift.openingTime;
          existingShift.closingTime = newShift.closingTime || existingShift.closingTime;
          existingShift.duréeDeReservation = newShift.duréeDeReservation || existingShift.duréeDeReservation;
        } else {
          weeklyScheet.shifts.push(newShift);
        }
      });
    }

    await weeklyScheet.save();
    res.status(200).json(weeklyScheet);
  } catch (error) {
    res.json({ message: "Erreur serveur", error });
  }
};

// Ajouter un shift à une carte horaire existante
WeeklyScheetController.addShift = async (req, res) => {
  const { scheetId } = req.params; 
  const { name, openingTime, closingTime,duréeDeReservation } = req.body; 

  if (!name || !openingTime || !closingTime || !duréeDeReservation) {
    return res.json({ message: 'Tous les champs du shift sont requis.' });
  }

  try {
    const scheet = await WeeklyScheet.findById(scheetId);
    if (!scheet) {
      return res.json({ message: "Feuille horaire non trouvée" });
    }

    const newShift = {
      name,
      openingTime,
      closingTime,
      duréeDeReservation
    };

    scheet.shifts.push(newShift);

    await scheet.save();

    return res.status(201).json({ message: "Shift ajouté avec succès", scheet });
  } catch (error) {
    return res.json({ message: "Erreur du serveur", error: error.message });
  }
};

// Supprimer un shift par son ID
WeeklyScheetController.deleteShift = async (req, res) => {
  const { scheetId, shiftId } = req.params;

  try {
    const scheet = await WeeklyScheet.findById(scheetId);
    if (!scheet) {
      return res.json({ message: "Feuille horaire non trouvée" });
    }

    scheet.shifts = scheet.shifts.filter(shift => shift._id.toString() !== shiftId);

    await scheet.save();

    return res.status(200).json({ message: "Shift supprimé avec succès", scheet });
  } catch (error) {
    return res.json({ message: "Erreur du serveur", error: error.message });
  }
};

// WeeklyScheetController.updateReservationSettings = async (req, res) => {
//   const { reservationInterval, maxPeoplePerInterval } = req.body;

//   try {
//     // Validation des entrées
//     if (reservationInterval === undefined || maxPeoplePerInterval === undefined) {
//       return res.json({ message: "Les deux champs 'reservationInterval' et 'maxPeoplePerInterval' sont requis." });
//     }

//     // Mettre à jour tous les WeeklyScheets avec les nouvelles valeurs
//     const updatedScheets = await WeeklyScheet.updateMany(
//       {}, // Critère vide pour mettre à jour tous les documents
//       { reservationInterval, maxPeoplePerInterval }, // Nouvelles valeurs
//       { new: true }
//     );

//     res.status(200).json({ message: "Paramètres de réservation mis à jour pour toutes les feuilles d'horaires", updatedScheets });
//   } catch (error) {
//     res.json({ message: "Erreur lors de la mise à jour des paramètres", error });
//   }
// };

module.exports = WeeklyScheetController;

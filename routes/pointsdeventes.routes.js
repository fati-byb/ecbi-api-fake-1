 const router = require('express').Router();
const pointDeVenteController = require('../controllers/pointsdeventes/pointdevente.controller');

router.post('/add-pointvente', pointDeVenteController.createRestaurant);
router.get('/get-pointvente/:name', pointDeVenteController.getRestaurantByName);

router.get('/get-pointvente', pointDeVenteController.getRestaurant);
router.put('/updateResto/:id', pointDeVenteController.updateRestaurant);


router.get('/archived', pointDeVenteController.getArchivedRestaurants);
router.put('/archived-pointvente/:id', pointDeVenteController.archiveRestaurant)
router.put('/unarchived-pointvente/:id', pointDeVenteController.unarchiveRestaurant)
 
module.exports = router;

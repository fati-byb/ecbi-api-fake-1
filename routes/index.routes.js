const express = require('express');
const router = express.Router();

const userRoutes = require('./users.routes');
const zoneRoutes= require('./zones.routes')
const pointsDeVentesRoutes = require('./pointsdeventes.routes');
const reservationRoutes = require('./reservation.routes');
const categoryRoutes= require('./categories.routes')
const productRoutes =require('./products.routes')
const passport = require('passport');
const WeeklyScheetRoutes = require('./shift.routes');
// const User = require('../models/user.model');
const tableRoutes= require('./tables.routes')
const optionRoutes = require('./options.routes');
const settingsRoutes=require('./settings.routes')

const User = require('../models/user.model');
router.use('/category', categoryRoutes)

router.use('/pointDeVente', pointsDeVentesRoutes);
router.use('/options', optionRoutes)
router.use('/products', productRoutes)
router.get('/users/:id/activate',require('../controllers/user/user.controller').activateUser);
router.use('/pointDeVente', pointsDeVentesRoutes);
router.use('/users', userRoutes);
router.use('/reservation', reservationRoutes)
router.use('/scheet', WeeklyScheetRoutes)
router.use('/zones',zoneRoutes)
router.use('/tables', tableRoutes)
router.use('/setting',settingsRoutes)
router.use('/category', categoryRoutes)
router.use('/products', productRoutes)


router.get('/editEnable/:id', async (req, res) => {
        try {
            const { id } = req.params;
            
            // Find the user by ID
            const user = await User.findById(id);
            
            // If the user does not exist, return an error response
            if (!user) {
                return res.json({ message: "User does not exist" });
            }
    
            // Update the 'enabled' field
            user.enabled = true;
    
            // Save the updated user to the database
            await user.save();
    
            // Return a success response
            return res.status(200).json({ message: "User enabled successfully", user });
        } catch (error) {
            // Handle any errors that occur
            return res.json({ message: "Server error", error });
        }
    });
// 

router.post('/auth', require('../controllers/user/auth.controller').login);
router.get('/editEnable/:id', async (req, res) => {
        try {
            const { id } = req.params;
            
            // Find the user by ID
            const user = await User.findById(id);
            
            // If the user does not exist, return an error response
            if (!user) {
                return res.status(404).json({ message: "User does not exist" });
            }
    
            // Update the 'enabled' field
            user.enabled = true;
    
            // Save the updated user to the database
            await user.save();
    
            // Return a success response
            return res.status(200).json({ message: "User enabled successfully", user });
        } catch (error) {
            // Handle any errors that occur
            return res.status(500).json({ message: "Server error", error });
        }
    });
 

router.all('*', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err || !user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = user;
        next();
    })(req, res, next);
});

router.get('/users/:id/activate',require('../controllers/user/user.controller').activateUser);
router.use('/pointDeVente', pointsDeVentesRoutes);
// router.use('/category', categoryRoutes)
// router.use('/products', productRoutes)

module.exports = router;
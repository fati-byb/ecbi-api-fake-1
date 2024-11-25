const User = require('../../models/user.model');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const userController = {};

const PointDeVente = require('../../models/pointdevente.model');
userController.createUser = async (req, res, next) => {
    try {
        const { email, password, pointOfSale, role, telephone, username } = req.body;

        // Check if user with the provided email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: 'User with this email already exists.' });
        }

        // Find the PointDeVente based on the string (pointOfSale)
        const pointDeVente = await PointDeVente.findOne({ name: pointOfSale }); // Assuming 'name' is the identifier
        if (!pointDeVente) {
            return res.json({ success: false, message: 'Point of sale not found.' });
        }

        // Create a new user with the PointDeVente ID
        const newUser = new User({
            email,
            password: await bcrypt.hash(password, 10), // Hash the password
            telephone,
            role,
            pointOfSale: pointDeVente._id, // Store the PointDeVente ID
            username
        });

        const savedUser = await newUser.save();
        res.json({ success: true, data: savedUser });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ success: false, message: 'Failed to create user' });
    }
};



userController.getUsers = async (req, res, next) => {
    try {
        // Récupère tous les utilisateurs de la base de données
        const users = await User.find().populate('pointOfSale'); // populate 'pointOfSale' pour inclure les détails du point de vente

        // Renvoie les utilisateurs sous forme de JSON
        res.json({ success: true, data: users });
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
        res.json({ success: false, message: 'Impossible de récupérer les utilisateurs' });
    }
};


// Mise à jour d'un utilisateur
userController.updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { username, email, password, role, enabled } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Invalid user ID' });
        }

        const user = await User.findById(id);
        if (!user) {
            const error = new Error('User not found');
            return next(error);
        }

        if (username) user.username = username;
        if (email) user.email = email;
        // if (password) user.password = await bcrypt.hash(password, 10); // Hash password if provided
        if (role) user.role = role;
        if (enabled !== undefined) user.enabled = enabled; // Update enabled status

        const updatedUser = await user.save();
        res.json({ success: true, data: updatedUser });
    } catch (err) {
        next(err);
    }
};

// Activer un utilisateur
userController.activateUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.json({ success: false, message: 'Invalid user ID' });
        }

        const user = await User.findById(id);
        if (!user) {
            const error = new Error('User not found');
            return next(error);
        }

        // Set enabled to true
        user.enabled = true;
        await user.save();

        res.json({ success: true, data: user });
    } catch (err) {
        next(err);
    }
};

module.exports = userController;

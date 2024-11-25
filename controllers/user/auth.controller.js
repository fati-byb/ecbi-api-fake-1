const jwt = require('jsonwebtoken');
const User = require('../../models/user.model');

const authController = {};

authController.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
   
        // user.password= password
        // user.save()
        // return 
    
         
         if (!user || !(await user.comparePassword(password))) {
            console.log('hashed pass', comparePassword(password))
            const error = new Error('Invalid email or password');
           
            return next(error);
        }

        // Generate JWT token
        const role= user.role;
        const token = jwt.sign(
            { _id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION }
        );

        res.json({ success: true, token, role});
    } catch (err) {
        console.log('we could not login ');
    }
};

module.exports = authController;

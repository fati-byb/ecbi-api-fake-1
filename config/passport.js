const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user.model');

module.exports = (passport) => {
    const opts = {};
    opts.secretOrKey = process.env.JWT_SECRET;
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

    passport.use(new JwtStrategy(opts, async (jwtPayload, done) => {
        
        try {
            console.log(jwtPayload)
            const user = await User.findById(jwtPayload._id);
            console.log(user)
            
            if (user && user.enabled) {
                return done(null, user);
            }
            
            return done(null, false);
        } catch (err) {
            return done(err, false);
        }
    }));
};

// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;
// const mongoose = require('mongoose');
// const User = require('../models/user.model'); // Assurez-vous que le chemin est correct

// module.exports = (passport) => {
//     // Vérification des variables d'environnement
//     if (!process.env.JWT_SECRET) {
//         console.error("JWT_SECRET n'est pas défini dans les variables d'environnement");
//         throw new Error("JWT_SECRET is not set in environment variables");
//     } else {
//         console.log("JWT_SECRET est défini:", process.env.JWT_SECRET); // Affiche la valeur de JWT_SECRET (assurez-vous de ne pas la loguer dans un environnement de production pour des raisons de sécurité)
//     }

//     // Options pour le JWT
//     const opts = {
//         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//         secretOrKey: process.env.JWT_SECRET,
//     };

//     // Définition de la stratégie JWT
//     passport.use(new JwtStrategy(opts, async (jwtPayload, done) => {
//         try {
//             console.log('JWT Payload:', jwtPayload); // Affiche le contenu du JWT pour vérification

//             // Vérifie si la connexion à MongoDB est active
//             if (mongoose.connection.readyState !== 1) {
//                 console.error("La connexion à la base de données MongoDB n'est pas établie.");
//                 return done(new Error("Database connection error"), false);
//             }

//             // Recherche de l'utilisateur dans la base de données
//             const user = await User.findById(jwtPayload._id);
//             console.log('Utilisateur trouvé:', user);

//             // Vérifie si l'utilisateur existe et est activé
//             if (user && user.enabled) {
//                 console.log('Utilisateur activé');
//                 return done(null, user);
//             } else {
//                 console.log('Utilisateur non trouvé ou désactivé');
//                 return done(null, false);
//             }
//         } catch (err) {
//             console.error('Erreur dans la stratégie JWT:', err); // Affiche les erreurs dans la console
//             return done(err, false);
//         }
//     }));
// };

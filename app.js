const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');
const passport = require('passport');
const cors = require('cors');
 const path = require('path');
const apiRouter = require('./routes/index.routes');
require('./config/passport')(passport);
const app = express();

let isProduction = process.env.NODE_ENV === "production";
app.use('/media/images', express.static(path.join('./media/images')));
 
 //-------------- DB Config --------------//
mongoose.connect(process.env.MONGODB_URI, {
    // useNewUrlParser: true,
    //  useUnifiedTopology: true

});

mongoose.connection.on('connected', () => {
    console.log('database connected successfully');
});
mongoose.connection.on('error', (err) => {
    console.error(`Failed to connect to the database: ${err}`);
});

if (!isProduction) {
    mongoose.set('debug', true);
}

//-------------- Middlewares --------------//
app.use(logger('dev'));
 
const whitelist = process.env.CORS_ALLOW || "*";
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || whitelist.indexOf("*") !== -1) {
            callback(null, true);
        } else {
            const err = new Error('Access Denied');
            err.status = 403;
            callback(err);
        }
    }
}

app.use(cors(corsOptions));

app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));

app.use(passport.initialize());

//-------------- Routes --------------//
app.use('/api', apiRouter);

//-------------- ERRORS --------------//
app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Error processing your request';
    res.status(status).send({ message });
});
app.get('/', (req, res) => {
    res.send('Hello from Vercel!');
  });
module.exports = app;


// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const logger = require('morgan');
// const passport = require('passport');
// const cors = require('cors');
// const path = require('path');
// const apiRouter = require('./routes/index.routes');
// require('./config/passport')(passport);

// const app = express();

// let isProduction = process.env.NODE_ENV === "production";
// app.use('/media/images', express.static(path.join('./media/images')));

// //-------------- DB Config --------------//
// mongoose.connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true 
// }).then(() => {
//     console.log('Database connected successfully');
// }).catch((err) => {
//     console.error('Failed to connect to the database:', err);
//     process.exit(1);  // Terminer si la connexion échoue
// });

// if (!isProduction) {
//     mongoose.set('debug', true);
// }

// //-------------- Middlewares --------------//
// app.use(logger('dev'));

// const whitelist = process.env.CORS_ALLOW || "*";
// const corsOptions = {
//     origin: function (origin, callback) {
//         if (whitelist.indexOf(origin) !== -1 || whitelist.indexOf("*") !== -1) {
//             callback(null, true);
//         } else {
//             const err = new Error('Access Denied');
//             err.status = 403;
//             callback(err);
//         }
//     }
// };

// app.use(cors(corsOptions));

// app.use(bodyParser.json({ limit: '20mb' }));
// app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));

// app.use(passport.initialize());

// //-------------- Routes --------------//
// app.use('/api', apiRouter);

// //-------------- ERRORS --------------//
// app.use((req, res, next) => {
//     let err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// app.use((err, req, res, next) => {
//     const status = err.status || 500;
//     const message = err.message || 'Error processing your request';

//     console.error(`Error: ${message} (Status: ${status})`);  // Logs d'erreurs pour le débogage
//     res.status(status).send({ message });
// });

// module.exports = app;


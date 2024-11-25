require('dotenv').config();

const app = require('./app');

// const server = require('http').createServer(app);

// const PORT = process.env.PORT || 4000;


// server.listen(PORT, () => {
//     console.log(`Server is ready for connections on port ${PORT} `);
// });
 
app.get('/api/category/get-categories', (req, res) => {
  res.json({ categories: categories });
});

app.get('/api/products/get-products', (req, res) => {
  res.json();
});


// Export the app as a handler for Vercel
module.exports = (req, res) => {
  // res.status(200).json({ message: res});
  app(req, res); // Pass the request and response to your express app
};
const express = require('express');
const mongoose = require('mongoose');
const Startup = require('./formmodel/model');
const path = require('path');

const app = express();

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Connect to MongoDB
mongoose.connect('mongodb+srv://DJARSOLUTIONS:SOLUTIONDJAR@djar-solutions.2vznu9i.mongodb.net/?retryWrites=true&w=majority&appName=DJAR-SOLUTIONS', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
}).on('error', (error) => {
  console.log('Connection error:', error);
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Route to display startups
app.get('/', async (req, res) => {
  try {
    const startups = await Startup.find();
    res.render('index', { startups });
  } catch (err) {
    res.status(500).send('Error fetching startups');
  }
});

// Start the server
const PORT = process.env.PORT || 3007;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // To parse JSON request bodies

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Express App!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
const firebase = require("firebase/app"); // Import Firebase core
require("firebase/auth"); // Import Firebase Authentication
const firebaseConfig = require("./Configs/firebaseconfigs.jsx"); // Ensure the path and extension are correct
const express = require("express");
const bodyParser = require("body-parser");
const buyersAuth = require("./routes/buyersApi.js");

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const app = express();

const PORT = process.env.PORT || 8002;

// Middleware to parse JSON bodies
app.use(bodyParser.json()); // Use json() instead of join()

// Route for buyer authentication
app.use('/auth/buyers', buyersAuth);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}`);
});

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const firebase = require('firebase/app'); // Import Firebase core
require('firebase/auth'); // Import Firebase Authentication
require('firebase/firestore'); // Import Firestore

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
    const { email, password, username, phonenumber } = req.body;

    try {
        // Hash the user's password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user in Firebase Authentication
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        const userId = userCredential.user.uid;

        // Store user details in Firestore, including the hashed password
        await firebase.firestore().collection('buyers').doc(userId).set({
            username,
            phonenumber,
            email,
            password: hashedPassword, // Store the hashed password
            createdAt: new Date(),
        });

        res.status(201).json({ message: "User created successfully", userId });
        
    } catch (error) {
        console.error("Registration error:", error.message);
        res.status(400).json({ error: error.message });
    }
});

// Login a user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Fetch the user from Firestore by email
        const userSnapshot = await firebase.firestore().collection('buyers').where('email', '==', email).get();
        
        if (userSnapshot.empty) {
            console.log("User not found with the provided email.");
            return res.status(400).json({ error: 'User not found' });
        }

        // Assuming one user per email
        const userDoc = userSnapshot.docs[0];
        const userData = userDoc.data();

        // Check if the password matches the hashed password stored in Firestore
        const isPasswordValid = await bcrypt.compare(password, userData.password);
        if (!isPasswordValid) {
            console.log("Invalid password.");
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate a JWT token
        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is not defined.");
            return res.status(500).json({ error: 'Server configuration error' });
        }

        const token = jwt.sign(
            { userId: userDoc.id, email: userData.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        console.log("Login successful, token generated.");
        res.status(200).json({ message: 'Login successful', token, userId: userDoc.id });

    } catch (error) {
        console.error("An error occurred during login:", error);
        res.status(500).json({ error: 'Login failed' });
    }
});

module.exports = router;

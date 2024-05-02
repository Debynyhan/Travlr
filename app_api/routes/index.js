const express = require('express');
const router = express.Router();
const { expressjwt: jwt } = require("express-jwt");
require('../models/user');
// Setup JWT midddleware
const auth = jwt({
    secret: process.env.JWT_SECRET,

    algorithms: ['HS256'] // Make sure to specify the algorithm
});


const authController = require('../controllers/authentication');

// This is where we import the controllers for the routes
const tripsController = require('../controllers/trips');

router.route('/login').post(authController.login);

router.route('/register').post(authController.register);

// Define route for our trips endpoint
router
    .route('/trips')
    .get(tripsController.tripsList) // Get Method routes tripList
    .post(auth, tripsController.tripsAddTrip); // Post Method routes tripAddTrips


// Get Method routes tripsFindByCode - requires parameters
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode) // Get Method routes tripList
    .put(auth, tripsController.tripsUpdateTrip); // Put Method routes trip

module.exports = router;    
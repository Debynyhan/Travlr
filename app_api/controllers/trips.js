const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model
const Model = mongoose.model('trips');
const User = mongoose.model('users');

// Get: /trip - lists all the trips
// Regardless of outcome, response must include HTML status 
// and JSON message to the requesting client
const tripsList = async (req, res) => {
    const q = await Model
        .find({}) // No filter, return all records
        .exec(); // Execute the query


    // Uncomment the following line to show results of query
    console.log(q);

    if (!q) { // Database returned no data
        return res
            .status(404)
            .json(err);
    } else { // Return resulting trip list
        return res
            .status(200)
            .json(q);
    }

};

// Get: /trip - lists all the trips
// Regardless of outcome, response must include HTML status 
// and JSON message to the requesting client
const tripsFindByCode = async (req, res) => {
    const q = await Model
        .find({ 'code': req.params.tripCode }) // No filter, return all records
        .exec(); // Execute the query


    // Uncomment the following line to show results of query
    // console.log(q);

    if (!q) { // Database returned no data
        return res
            .status(404)
            .json("No trips found");
    } else { // Return resulting trip list
        return res
            .status(200)
            .json(q);
    }

};



const getUser = async (req, res) => {
    console.log("Getting user...");
    if (req.auth && req.auth.email) {
        try {
            console.log("Try: " );
            const user = await User.findOne({ email: req.auth.email }).exec();
            console.log("user: ");
            if (!user) {
                return res.status(404).json({ "message": "User not found" });
            }
            return user.name; // return the user's name or the user object as needed
        } catch (err) {
            console.log(err);
            return res.status(404).json(err);
        }
    } else {
        return res.status(404).json({ "message": "Users not found" });
    }
};



const tripsAddTrip = async (req, res) => {
    getUser(req, res,
        (req, res) => {
            Trip
                .create({
                    code: req.body.code,
                    name: req.body.name,
                    length: req.body.length,
                    start: req.body.start,
                    resort: req.body.resort,
                    perPerson: req.body.perPerson,
                    image: req.body.image,
                    description: req.body.description
                },
                    (err, trip) => {
                        if (err) {
                            return res
                                .status(400) // bad request
                                .json(err);
                        } else {
                            return res
                                .status(201) // created
                                .json(trip);
                        }
                    });
        }
    );
}

// PUT: /trips/:tripCode - Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsUpdateTrip = async (req, res) => {
    getUser(req, res,
        (req, res) => {
            Trip
                .findOneAndUpdate({ 'code': req.params.tripCode }, {
                    code: req.body.code,
                    name: req.body.name,
                    length: req.body.length,
                    start: req.body.start,
                    resort: req.body.resort,
                    perPerson: req.body.perPerson,
                    image: req.body.image,
                    description: req.body.description
                }, { new: true })
                .then(trip => {
                    if (!trip) {
                        return res
                            .status(404)
                            .send({
                                message: "Trip not found with code" + req.params.tripCode
                            });
                    }
                    res.send(trip);
                }).catch(err => {
                    if (err.kind === 'ObjectId') {
                        return res
                            .status(404)
                            .send({
                                message: "Trip not found with code" + req.params.tripCode
                            });
                    }
                    return res
                        .status(500) // server error
                        .json(err);
                });
        }
    );
}

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    getUser,
    tripsUpdateTrip
};
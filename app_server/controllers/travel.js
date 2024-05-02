// const fs = require('fs');
// const trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

const tripsEndpoint = 'http://localhost:3000/api/trips';
const options = {
    method: 'GET',
    header: {
        'Accept': 'application/json'
    }
}

/* Get travel view */
const travel = async function (req, res, next) {
    await fetch(tripsEndpoint, options)
        .then(res => res.json())
        .then(json => {
            let message = null;
            if (!(json instanceof Array)) {
                message = 'API lookup failed';
                json = [];
            } else {
                if (!json.length) {
                    message = 'No trips found in the database';
                }
            }
            res.render('travel', {
                title: 'Travlr Getaways',
                trips: json,
                message,
                currentPage: 'travel'
            });
        })
        .catch((err) => res.status(500).send(e.message));

};


module.exports = {
    travel
};

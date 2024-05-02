const fs = require('fs');
const mealsData = JSON.parse(fs.readFileSync('./data/meals.json', 'utf8'));

/* Get meals view */
const meals = (req, res) => {

    // Log the mealsData array to the console
    console.log('Meals Data:', mealsData);

    res.render('meals', {

        title: 'Foods - Travlr Getaways Website Template',
        mealsData: mealsData,
        currentPage: 'meals'
    });

};

module.exports = {
    meals
};

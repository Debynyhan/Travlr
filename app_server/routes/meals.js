const express = require('express');
const controller = require('../controllers/meals');
const router = express.Router();


/* GET travel page. */
router.get('/', controller.meals);

module.exports = router;
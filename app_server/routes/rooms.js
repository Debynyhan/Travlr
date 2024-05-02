const express = require('express');
const controller = require('../controllers/rooms');


const router = express.Router();

/* GET rooms page. */
router.get('/', controller.rooms);

module.exports = router;

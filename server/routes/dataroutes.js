const express = require('express');
const asteroidController = require('../controllers/asteroidController');
const pagination = require('../middleware/pagination')

const router = express.Router();

// Route to fetch asteroid data
router.get('/', asteroidController.fetchAsteroid, pagination.resultpagination, (req, res) => {
    // Send paginated results and metadata as the response
    
    res.json({
        pagination: res.locals.paginationInfo,
        results: res.locals.paginatedResults,
    });
});


module.exports = router;
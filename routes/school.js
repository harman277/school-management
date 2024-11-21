const express = require('express');
const router = express.Router();
const { addSchool, listSchools } = require('../controllers/schoolController');

// Add School
router.post('/addSchool', addSchool);

// List Schools
router.get('/listSchools', listSchools);

module.exports = router;

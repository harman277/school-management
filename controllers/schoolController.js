const db = require('../config/db');
const haversine = require('haversine-distance');


//get/fetch all school data present in db
exports.listSchools = (req, res) => {
    const userLat = parseFloat(req.query.latitude);
    const userLon = parseFloat(req.query.longitude);

    if (!userLat || !userLon) {
        return res.status(400).json({ message: 'Latitude and Longitude are required.' });
    }

    const query = 'SELECT * FROM schools';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Database error.' });
        }

        const sortedSchools = results.map(school => {
            const distance = haversine(
                { lat: userLat, lon: userLon },
                { lat: school.latitude, lon: school.longitude }
            );
            return { ...school, distance };
        }).sort((a, b) => a.distance - b.distance);

        res.status(200).json(sortedSchools);
    });
};
// add new school
exports.addSchool = (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    // Validation
    if (!name || !address || !latitude || !longitude) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    db.query(query, [name, address, parseFloat(latitude), parseFloat(longitude)], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Database error.' });
        }
        res.status(201).json({ message: 'School added successfully.' });
    });
};


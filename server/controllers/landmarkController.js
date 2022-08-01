const router = require('express').Router();

const landmarkService = require('../services/landmarkService');
// const authService = require('../services/authService');

// const User = require('../models/User');

router.post('/add-landmark', async (req, res) => {
    const { name, town, country, imageUrl, description } = req.body;
    try {
        if (name == '' || town == '' || country == '' || imageUrl == '' || description == '') {
            throw new Error('Empty fields!')
        }

        const result = await landmarkService.create({ name, town, country, imageUrl, description});

        if (!result.name) {
            throw result
        }

        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

});

module.exports = router;
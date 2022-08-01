const router = require('express').Router();

const { SECRET } = require('../config/env');
const landmarkService = require('../services/landmarkService');
const jwt = require('jsonwebtoken');
const authService = require('../services/authService');

const User = require('../models/User');

router.post('/add-landmark', async (req, res) => {
    const { name, town, country, imageUrl, description } = req.body;
    const token = req.headers['x-authorization'];
    var decoded = jwt.verify(token, SECRET);
    const email = decoded.email;
    const user = await User.findOne({ email });

    try {
        if (name == '' || town == '' || country == '' || imageUrl == '' || description == '') {
            throw new Error('Empty fields!')
        }

        const result = await landmarkService.create({ name, town, country, imageUrl, description, postedBy: user._id });

        await authService.update(user._id, {
            _id: user._id,
            accessToken: user.accessToken,
            email: user.email,
            password: user.password,
            landmarks: [...user.landmarks, result._id]
        });

        if (!result.name) {
            throw result
        }

        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

});

module.exports = router;
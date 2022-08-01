const router = require('express').Router();

const authService = require('../services/authService');

const User = require('../models/User');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        if (email == '' || password == '') {
            throw new Error('Empty fields!')
        }

        const result = await authService.login(email, password);

        if (!result.email) {
            throw result
        }
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

});

router.post('/register', async (req, res) => {

    const { email, password, repass } = req.body;
    try {
        const existing = await User.findOne({ email });

        if (existing) {
            throw new Error('Email is taken!')
        }

        if (password !== repass) {
            throw new Error('Password missmatch!')
        }

        const accessToken = await authService.createToken(email)
        const createdUser = await authService.create({ email, password, accessToken })

        res.status(201).json(createdUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

});

module.exports = router;
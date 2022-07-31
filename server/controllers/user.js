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

        const token = await authService.createToken(result)
        result.accessToken = token;

        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

});

router.post('/register', async(req, res) => {
   
    const { email, password, repass } = req.body;
    try {
        const existing = await User.findOne({ email });

        if (existing) {
            throw new Error('Email is taken!')
        }

        if (password !== repass) {
            throw new Error('Password missmatch!')
        }

        const createdUser = await authService.create({ email, password })

        const token = await authService.createToken(createdUser)
        createdUser.accessToken = token

        res.status(201).json(createdUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

});

module.exports = router;
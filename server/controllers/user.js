const router = require('express').Router();

const authService = require('../services/authService');
const { COOKIE_SESSION_NAME } = require('../config/constants');

const User = require('../models/User');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (email == '' || password == '') {
        throw new Error('Empty fields!')
    }

    const user = await authService.login(email, password);

    if (!user) {
        throw new Error('Invalid email or password')
    }
    
    const token = await authService.createToken(user);
    res.cookie(COOKIE_SESSION_NAME, token, { httpOnly: true });
    res.json(user);
});

router.post('/register', async (req, res) => {
    const { email, password, repass } = req.body;

    const emailIsTaken = await User.findOne({ email });

    if (emailIsTaken) {
        throw new Error('Email is taken!')
    }

    if (password !== repass) {
        throw new Error('Password missmatch!')
    }

    const createdUser = await authService.create({ email, password })
    const token = await authService.createToken(createdUser)

    res.cookie(COOKIE_SESSION_NAME, token, { httpOnly: true });
    res.json(createdUser);
});

router.get('/logout', (req, res) => {
    res.clearCookie(COOKIE_SESSION_NAME);
});

module.exports = router;
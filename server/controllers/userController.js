const router = require('express').Router();

const authService = require('../services/authService');
const landmarkService = require('../services/landmarkService');

const errorChecker = require('../utils/errorChecker');

const User = require('../models/User');

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email == '' || password == '') {
            throw new Error('Empty fields!');
        }

        const result = await authService.login(email, password);
        errorChecker(result);

        res.json(result)
    } catch (error) {
        res.json({ message: error.message });
    }

});

router.post('/register', async (req, res) => {
    try {
        const { username, email, password, repass } = req.body;

        const existingUsername = await User.findOne({ username });
        errorChecker(existingUsername);

        if (existingUsername) {
            throw new Error('Username is taken!');
        }

        const existingEmail = await User.findOne({ email });
        errorChecker(existingEmail);
        
        if (existingEmail) {
            throw new Error('Email is taken!');
        }

        if (password !== repass) {
            throw new Error('Password missmatch!');
        }

        const accessToken = await authService.createToken(email);
        errorChecker(accessToken);

        const createdUser = await authService.create({ username, email, password, accessToken });
        errorChecker(createdUser);

        res.json(createdUser);
    } catch (error) {
        console.log(error);
        res.json({ message: error.message });
    }

});

router.get('/my-profile', async (req, res) => {
    try {
        const user = await authService.getUser(req);
        errorChecker(user);

        const landmarkIds = user.landmarks;

        let landmarks = [];

        for (const landmarkId of landmarkIds) {
            const landmark = await landmarkService.getOne(landmarkId);
            errorChecker(landmark);
            landmarks.push(landmark);
        }

        res.json(landmarks);
    } catch (error) {
        req.json({ message: error.message });
    }

});

module.exports = router;
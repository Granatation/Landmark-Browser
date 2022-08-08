const router = require('express').Router();

const landmarkService = require('../services/landmarkService');
const authService = require('../services/authService');

router.post('/add-landmark', async (req, res) => {
    try {
        const { name, town, country, imageUrl, description } = req.body;

        if (name == '' || town == '' || country == '' || imageUrl == '' || description == '') {
            throw new Error('Empty fields!')
        }

        const user = await authService.getUser(req);
        errorChecker(user);

        const result = await landmarkService.create({ name, town, country, imageUrl, description, postedBy: user._id });
        errorChecker(result);

        const landmarkArr = [...user.landmarks, result._id];

        const updatedUser = await authService.update(user._id, {
            _id: user._id,
            username: user.username,
            accessToken: user.accessToken,
            email: user.email,
            password: user.password,
            landmarks: landmarkArr
        });
        errorChecker(updatedUser);

        res.json(result);
    } catch (error) {
        res.json({ message: error.message });
    }
});

router.get('/all-landmarks', async (req, res) => {
    try {
        const landmarks = await landmarkService.getAll();
        errorChecker(landmarks);

        res.json(landmarks);
    } catch (error) {
        res.json({ message: error.message });
    }
});

router.get('/all-landmarks/:landmarkId', async (req, res) => {
    try {
        const landmark = await landmarkService.getOne(req.params.landmarkId);
        errorChecker(landmark);

        const postedBy = await authService.getOne(landmark.postedBy);
        errorChecker(postedBy);

        res.json({ landmark, postedBy });
    } catch (error) {
        res.json({ message: error.message });
    }
});

router.get('/all-landmarks/:landmarkId/edit', async (req, res) => {
    try {
        const landmark = await landmarkService.getOne(req.params.landmarkId);
        errorChecker(landmark);

        res.json(landmark);
    } catch (error) {
        res.json({ message: error.message });
    }
});

router.post('/all-landmarks/:landmarkId/edit', async (req, res) => {
    try {
        const { name, town, country, imageUrl, description } = req.body;

        const user = authService.getUser(req);
        errorChecker(user);

        const updatedLandmark = await landmarkService
            .update(req.params.landmarkId, { name, town, country, imageUrl, description, postedBy: user._id });
        errorChecker(updatedLandmark);

        res.json(updatedLandmark);
    } catch (error) {
        res.json({ message: error.message });
    }
});

router.get('/all-landmarks/:landmarkId/delete', async (req, res) => {
    try {
        const landmark = await landmarkService.del(req.params.landmarkId);
        errorChecker(landmark);

        const user = await authService.getUser(req);
        errorChecker(user);

        const landmarkArr = user.landmarks.filter(x => x != req.params.landmarkId);
        errorChecker(landmarkArr);

        const updatedUser = await authService.update(user._id, {
            _id: user._id,
            username: user.username,
            accessToken: user.accessToken,
            email: user.email,
            password: user.password,
            landmarks: landmarkArr
        });
        errorChecker(updatedUser);

        res.json(landmark);
    } catch (error) {
        res.json({ message: error.message });
    }
});

router.get('/all-landmarks/:landmarkId/visit', async (req, res) => {
    try {
        const landmark = await landmarkService.getOne(req.params.landmarkId);
        errorChecker(landmark);

        const user = await authService.getUser(req);
        errorChecker(user);

        const visitorsArr = [...landmark.visitors, user._id];
        errorChecker(visitorsArr);

        const updatedLandmark = await landmarkService.update(req.params.landmarkId, {
            _id: landmark._id,
            name: landmark.name,
            town: landmark.town,
            country: landmark.country,
            imageUrl: landmark.imageUrl,
            description: landmark.description,
            postedBy: landmark.postedBy,
            visitors: visitorsArr
        });
        errorChecker(updatedLandmark);

        res.json(updatedLandmark);
    } catch (error) {
        req.json({ message: error.message });
    }
});

module.exports = router;
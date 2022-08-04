const router = require('express').Router();

const landmarkService = require('../services/landmarkService');
const authService = require('../services/authService');

router.post('/add-landmark', async (req, res) => {
    const { name, town, country, imageUrl, description } = req.body;

    try {
        if (name == '' || town == '' || country == '' || imageUrl == '' || description == '') {
            throw new Error('Empty fields!')
        }

        const user = authService.getUser(req);

        const result = await landmarkService.create({ name, town, country, imageUrl, description, postedBy: user._id });

        await authService.update(user._id, {
            _id: user._id,
            username: user.username,
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

router.get('/all-landmarks', async (req, res) => {
    const landmarks = await landmarkService.getAll();
    res.json(landmarks);
});

router.get('/all-landmarks/:landmarkId', async (req, res) => {
    const landmark = await landmarkService.getOne(req.params.landmarkId);
    const postedBy = await authService.getOne(landmark.postedBy);
    res.json({ landmark, postedBy });
});

router.get('/all-landmarks/:landmarkId/edit', async (req, res) => {
    const landmark = await landmarkService.getOne(req.params.landmarkId);
    res.json(landmark);
});

router.post('/all-landmarks/:landmarkId/edit', async (req, res) => {
    const { name, town, country, imageUrl, description } = req.body;
    const user = authService.getUser(req);

    const updatedLandmark = await landmarkService
        .update(req.params.landmarkId, { name, town, country, imageUrl, description, postedBy: user._id });

    res.json(updatedLandmark);
});

module.exports = router;
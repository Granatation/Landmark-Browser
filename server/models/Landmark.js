const mongoose = require('mongoose');

const landmarkSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name required'],
    },
    town: {
        type: String,
        required: [true, 'Town/City required']
    },
    country: {
        type: String,
        required: [true, 'Country required']
    },
    imageUrl: {
        type: String,
        required: [true, 'Image URL required']
    },
    description: {
        type: String,
        required: [true, 'Description required']
    },
    postedBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    visitedBy:[{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]
});

const Landmark = mongoose.model('Landmark', landmarkSchema);

module.exports = Landmark;
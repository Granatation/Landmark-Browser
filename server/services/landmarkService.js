const Landmark = require('../models/Landmark');

exports.create = (landmarkData) => Landmark.create(landmarkData);
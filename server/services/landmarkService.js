const Landmark = require('../models/Landmark');

exports.create = (landmarkData) => Landmark.create(landmarkData);

exports.getAll = () => Landmark.find().lean();

exports.getOne = (landmarkId) => Landmark.findById(landmarkId).lean();

exports.update = (landmarkId, landmarkData) => Landmark.updateOne({ _id: landmarkId }, { $set: landmarkData });
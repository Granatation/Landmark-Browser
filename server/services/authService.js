const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { SECRET } = require('../config/env')

exports.create = (data) => User.create(data);

exports.update = (userId, userData) => User.updateOne({ _id: userId }, { $set: userData });

exports.getOne = (userId) => User.findById(userId);

exports.login = async (email, password) => {
    try {
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('Cannot find email or password')
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            throw new Error('Cannot find email or password')
        }
        
        return user;
    } catch (error) {
        return error
    }
};

exports.createToken = (email) => {
    try {
        const payload = { email };

        return new Promise((resolve, reject) => {
            jwt.sign(payload, SECRET, (err, decodedToken) => {
                if (err) {
                    return reject(err);
                }
                resolve(decodedToken);
            })

        });
    } catch (error) {
        return error
    }
}

exports.getUser = async (req) => {
    try {
        const token = req.headers['x-authorization'];
        var decoded = jwt.verify(token, SECRET);
        const email = decoded.email;
        const user = await User.findOne({ email }).lean();

        if(user.message){
            throw user
        }
        
        return user;
    } catch (error) {
        return error;
    }
}
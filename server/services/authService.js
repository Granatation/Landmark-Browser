const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { SECRET } = require('../config/env')

exports.create = async(data) => User.create(data);


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

exports.createToken = (user) => {
    const payload = { _id: user._id, email: user.email };
    const options = { expiresIn: '2d' }

    return new Promise((resolve, reject) => {
        jwt.sign(payload, SECRET, options, (err, decodedToken) => {
            if (err) {
                return reject(err);
            }
            resolve(decodedToken);
        })

    });
}
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { SALT_ROUNDS } = require('../config/env')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username required'],
    },
    email: {
        type: String,
        required: [true, 'Email required'],
    },
    password: {
        type: String,
        required: [true, 'Password required']
    },
    accessToken: {
        type:String
    },
    landmarks:[{
        type: mongoose.Types.ObjectId,
        ref: 'Landmark'
    }]
});

userSchema.pre('save', function(next) {
    bcrypt.hash(this.password, SALT_ROUNDS)
        .then(hashedPass => {
            this.password = hashedPass;

            next();
        });
})

const User = mongoose.model('User', userSchema);

module.exports = User;
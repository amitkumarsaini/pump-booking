var mongoose = require('mongoose');
var user = mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'User Name Required']
    },
    password: {
        type: String,
        required: [true, 'Password Required']
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    phone: {
        type: String,
        validate: {
            validator: function (v) {
                return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required']
    },
    geo: { type: [Number], index: '2d' },
    status: {
        type: String,
        enum: ['Active', 'Deleted', 'Blocked'],
        default: "Active"
    },
    profilePic: { type: String },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

var UserSchema = mongoose.model('user', user);

module.exports = UserSchema;
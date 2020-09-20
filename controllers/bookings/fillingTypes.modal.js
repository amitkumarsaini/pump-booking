var mongoose = require('mongoose');
var fillingTypes = mongoose.Schema({
    name: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

var FillingTypes = mongoose.model('fillingTypes', fillingTypes);

module.exports = FillingTypes;
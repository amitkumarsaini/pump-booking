var mongoose = require('mongoose');

var pumpSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Pump Name Required']
    },
    geo: { type: [Number], index: '2d' },
    open24: {
        type: Boolean,
        default: false
    },
    isGasAvailable: {
        type: Boolean,
        default: false
    },
    isPetrolAvailable: {
        type: Boolean,
        default: false
    },
    isDiesellAvailable: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

var PumpSchema = mongoose.model('pump', pumpSchema);

module.exports = PumpSchema;
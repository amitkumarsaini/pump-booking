var mongoose = require('mongoose');
var bookingSchema = mongoose.Schema({
    pumpId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pump'
    },
    bookingDateTime: {
        type: Date,
        require: true
    },
    bookedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    totalVehicles: {
        type: Number,
        require: true
    },
    fillingType: {
        type: [mongoose.Schema.Types.ObjectId], ref: 'fillingTypes'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

var BookingSchema = mongoose.model('booking', bookingSchema);

module.exports = BookingSchema;
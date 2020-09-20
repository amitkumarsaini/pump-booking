"use strict";

const booking = require("./bookings.modal");
const mongoose = require("mongoose");
const responseMessages = require("../../lib/responseMessages");
const fillingTypes = require("./fillingTypes.modal");
const _booking = {};

_booking.addBooking = async (req, res) => {
    let dataToSave = req.body;
    let booking = await new booking(dataToSave).save();
    try {
        res.json({
            success: true,
            booking: booking,
            message: responseMessages.DATAADDED,
        });
    } catch (err) {
        res.json({
            success: false,
            message: responseMessages.ERROR,
        });
    }
};

_booking.addFillingType = async (req, res) => {
    let dataToSave = req.body;
    let fillingTypes = await new fillingTypes(dataToSave).save();
    try {
        res.json({
            success: true,
            message: responseMessages.DATAADDED,
        });
    } catch (err) {
        res.json({
            success: false,
            message: responseMessages.ERROR,
        });
    }
};

_booking.getFillingType = async (req, res) => {
    let fillings = await new fillingTypes.find();
    try {
        res.json({
            success: true,
            fillings: fillings
        });
    } catch (err) {
        res.json({
            success: false,
            message: responseMessages.ERROR,
        });
    }
};

_booking.getBookingListforUser = async (req, res) => {
    let userId = req.userId;
    let bookings = await new booking.find({ bookedBy: mongoose.Types.ObjectId(userId) }).populate({ path: "pumpId" }).populate({ path: "bookedBy" }).populate({ path: 'fillingType' });
    try {
        res.json({
            success: true,
            fillings: bookings
        });
    } catch (err) {
        res.json({
            success: false,
            message: responseMessages.ERROR,
        });
    }
};

_booking.getBookingListforPump = async (req, res) => {
    let pumpId = req.userId;
    let bookings = await new booking.find({ pumpId: mongoose.Types.ObjectId(pumpId) }).populate({ path: "pumpId" }).populate({ path: "bookedBy" }).populate({ path: 'fillingType' })
    try {
        res.json({
            success: true,
            bookings: bookings
        });
    } catch (err) {
        res.json({
            success: false,
            message: responseMessages.ERROR,
        });
    }
};

module.exports = _booking;

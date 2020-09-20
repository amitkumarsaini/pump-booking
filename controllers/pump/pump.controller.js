"use strict";

const pump = require("./pump.modal");
const mongoose = require("mongoose");
const responseMessages = require("../../lib/responseMessages");
const _pump = {};

_pump.addPump = async (req, res) => {
    let dataToSave = req.body;
    let addPump = await new pump(dataToSave).save();
    try {
        res.json({
            success: true,
            pump: addPump,
            message: responseMessages.DATAADDED,
        });
    } catch (err) {
        res.json({
            success: false,
            message: responseMessages.ERROR,
        });
    }
};


_pump.getPumpNearMe = async (req, res) => {
    var distance = 1000;
    var query = pump.find({
        'geo': {
            $near: [
                req.body.lat,
                req.body.lng
            ],
            $maxDistance: distance
        }
    });
    query.exec(function (err, pumps) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (!pumps) {
            res.json({
                success: false,
                message: "Pumps not found near you!",
            });
        } else {
            res.json({
                success: false,
                pumps: pumps
            });
        }
    })
};

module.exports = _pump;

"use strict";

const jwt = require("jsonwebtoken");
const services = require("../../services/user.service");
const user = require("./user.modal");
const bcrypt = require("bcrypt");
const responseMessages = require("../../lib/responseMessages");
const fs = require("fs");
const multer = require("multer");
const dir = "./uploads/user";
const _user = {};
const maxFileSize = 3 * 1024 * 1024; // max file size 

/*  function to log in*/
_user.login = async (req, res, next) => {
    let payloadData = req.body;
    const criteria = {
        email: payloadData.email,
    };
    let user = await services.getOneUser(criteria);
    if (!user) {
        req.responseData = {
            success: false,
            message: responseMessages.USERNOTFOUND,
        };
        next();
    } else {
        if (user.status !== "Active") {
            req.responseData = {
                success: false,
                message: responseMessages.BLOCKED,
            };
            next();
        } else {
            let pwPresent = await bcrypt.compare(payloadData.password, user.password);
            if (pwPresent === true) {
                let token_Data = {
                    email: user.email,
                    _id: user._id,
                };
                let token = jwt.sign(token_Data, process.env.JWT_SECRET, {
                    expiresIn: "1d", // expires in 24 hours
                });
                req.responseData = {
                    success: true,
                    data: {
                        user: user,
                        token: token,
                    },
                    message: responseMessages.LOGINSUCCESSFULL,
                };
                next();
            } else {
                req.responseData = {
                    success: false,
                    message: responseMessages.PASSWORDNOTMATCH,
                };
                next();
            }
        }
    }
};

/* function to register*/
_user.register = async (req, res, next) => {
    let payloadData = req.body;
    let hash = await bcrypt.hash(
        payloadData.password,
        parseInt(process.env.SALT_ROUNDS)
    );

    payloadData.password = hash;
    try {
        let checkExist = await user.findOne({ email: req.body.email });
        if (checkExist) {
            req.responseData = {
                success: false,
                message: responseMessages.UNIQUEERROR("Email"),
            };
            next();
        } else {
            let user = await services.createUser(payloadData);
            if (user.name === "MongoError" && user.code === 11000) {
                req.responseData = {
                    success: false,
                    message: responseMessages.UNIQUEERROR(user.errmsg),
                };
                next();
            } else {
                req.responseData = {
                    success: true,
                    message: responseMessages.NEWREGISTRATION,
                };
                next();
            }
        }
    } catch {
        req.responseData = {
            success: false,
            message: responseMessages.REGISTRATIONFAILED,
        };
        next();
    }
};

/* function to upload User Pic*/
_user.uploadUserPic = async (req, res) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    upload(req, res, async (err) => {
        if (err) {
            res.json({
                success: false,
                message: err,
            });
        } else {
            let criteria = {
                _id: mongoose.Types.ObjectId(req.user_id),
            };
            let data = req.body;
            if (req.file) {
                let image = req.file.path;
                data.profilePic = image;
            }
            let options = {
                upsert: true,
                new: true,
            };
            user.findOneAndUpdate(criteria, data, options, function (err, user) {
                if (err) {
                    res.json({
                        success: false,
                        message: err,
                    });
                } else {
                    res.json({
                        success: true,
                        message: responseMessages.USEREDITED,
                    });
                }
            });
        }
    });
};

var storage = multer.diskStorage({
    /* destination*/
    destination: function (req, file, cb) {
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, new Date().getTime().toString() + "-" + file.originalname);
    },
});
const upload = multer({ storage: storage, limits: { fileSize: maxFileSize } }).single("Image");

module.exports = _user;
/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com */
var winston = require('winston');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint, json } = format;
const path = require('path');
const fs = require('fs');
const Rotate = require('winston-logrotate').Rotate;
const logDirectory = path.join(__dirname, '../..', 'log', 'access.log');
const rotateTransport = new Rotate({
  file: logDirectory,
  colorize: false,
  timestamp: true,
  json: true,
  size: '2m',
  keep: 5,
  compress: true
});

winston.add(rotateTransport);

const logger = createLogger({
  format: combine(timestamp(), prettyPrint(), json()),
  transports: [rotateTransport]
});

const log = (message, user_id, user_name) => {
  logger.log({
    level: 'info',
    message: message,
    user_id: user_id,
    user_name: user_name
  });
};

exports.setLog = (req, res) => {
  let responseData = req.responseData;
  message = responseData.message ? responseData.message : null;
  user_id = req.user_id ? req.user_id : null;
  user_name = req.username ? req.username : null;
  log(message, user_id, user_name);
  return res.json(responseData);
};

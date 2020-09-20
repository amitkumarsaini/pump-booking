/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com */
"use strict";

/*
 * Library for storing and editing data
 */

// Dependencies
const User = require("../controllers/user/user.modal");

const _service = {};

/* Services for create User*/
_service.createUser = function createUser(objToSave) {
  return new User(objToSave)
    .save()
    .then(response => {
      return response.toObject();
    })
    .catch(err => {
      return err;
    });
};

/* Services for get User*/
_service.getUser = function getUser(criteria, projection = {}, options = {}) {
  return User.find(criteria, projection, options).exec();
};

/* Services for get One User*/
_service.getOneUser = function getOneUser(
  criteria,
  projection = {},
  options = {}
) {
  return User.findOne(criteria, projection, options).exec();
};

/* Services for update User*/
_service.updateUser = function updateUser(criteria, update = {}, options = {}) {
  return User.findOneAndUpdate(criteria, update, options).exec();
};

/* Services for delete User*/
_service.deleteUser = function deleteUser(
  criteria,
  projection = {},
  options = {}
) {
  return User.findOneAndRemove(criteria).exec();
};

module.exports = _service;

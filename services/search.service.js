/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com */
"use strict";

/*
 * Library for storing and editing data
 */

// Dependencies
const AdvanceSearch = require("../models/advanceSearch.js");
const appearance = require("../models/appearance.js");
const lifestyle = require("../models/lifestyle.js");
const users = require("../models/users.model.js");
const religious = require("../models/religiousBackground.js");
const educationCareer = require("../models/educationCareer");
const ownWords = require("../models/ownWords");
const personalityProfile = require("../models/personalityProfile");
const media = require("../models/media.js");
const myMatches = require("../models/myMatches.js");

const _service = {};

/* Services for save advance search*/
_service.saveAdvanceSearch = function saveAdvanceSearch(objToSave) {
  return new AdvanceSearch(objToSave)
    .save()
    .then((response) => {
      return response.toObject();
    })
    .catch((err) => {
      return err;
    });
};

_service.memberNumberSearch = async function memberNumberSearch(objToSave) {
  try {
    let basicData = await users.findOne(objToSave);

    let lifestyleData = await lifestyle.findOne({ userId: basicData._id });

    let appearanceData = await appearance.findOne({ userId: basicData._id });

    let religiousBackgroundData = await religious.findOne({
      userId: basicData._id,
    });
    let ownWordsData = await ownWords.findOne({ userId: basicData._id });
    let educationData = await educationCareer.findOne({
      userId: basicData._id,
    });
    let personalityProfileData = await personalityProfile.findOne({
      userId: basicData._id,
    });
    let mediaData = await media.findOne({
      userId: basicData._id,
    });

    if (!basicData) {
      res.json({
        success: false,
        message: responseMessages.USERNOTFOUND,
      });
    } else {
      return {
        basicData: basicData,
        lifestyleData: lifestyleData,
        appearanceData: appearanceData,
        religiousBackgroundData: religiousBackgroundData,
        ownWordsData: ownWordsData,
        educationData: educationData,
        personalityProfileData: personalityProfileData,
        mediaData: mediaData,
      };
    }
  } catch (error) {
    res.json({
      success: false,
      message: responseMessages.ERROR,
    });
  }

  const user = await (await users.findOne(objToSave))
    .populate("_id")
    .exec((err, _id) => {});
  let basicData = await users.findOne(objToSave);

  let lifestyleData = await lifestyle.findOne({ userId: basicData._id });

  let appearanceData = await appearance.findOne({ userId: basicData._id });

  let religiousBackgroundData = await religious.findOne({
    userId: basicData._id,
  });
  let ownWordsData = await ownWords.findOne({ userId: basicData._id });
  let educationData = await educationCareer.findOne({
    userId: basicData._id,
  });
  let personalityProfileData = await personalityProfile.findOne({
    userId: basicData._id,
  });
  let mediaData = await media.findOne({
    userId: basicData._id,
  });

  if (!basicData) {
    res.json({
      success: false,
      message: responseMessages.USERNOTFOUND,
    });
  } else {
    return {
      basicData: basicData,
      lifestyleData: lifestyleData,
      appearanceData: appearanceData,
      religiousBackgroundData: religiousBackgroundData,
      ownWordsData: ownWordsData,
      educationData: educationData,
      personalityProfileData: personalityProfileData,
      mediaData: mediaData,
    };
  }
};

_service.latestPhotosSearch = async () => {
  try {
    let newMemberfound = await users
      .find({
        profileImg: { $exists: true },
      })
      .sort({ updatedOn: -1 })
      .limit(10);
    return newMemberfound;
  } catch (error) {
    throw error;
  }
};
_service.inMyAreaSearch = async function inMyAreaSearch(userId) {
  let findUser = await users.findOne(
    { _id: userId },
    { city: 1, country: 1, province: 1 }
  );
  let findAllUser = await users.find({
    city: findUser.city,
    country: findUser.country,
    province: findUser.province,
  });
  return findAllUser;
};

_service.myMatchesSearch = async function myMatchesSearch(objToSave) {
  let userDetails = await users.findOne(objToSave);
  let gender = "Female";
  if (userDetails.gender === "Female") {
    gender = "Male";
  }
  let myMatchesfound = await users
    .find({ gender: gender })
    .sort({ updatedOn: -1 });

  return myMatchesfound;
};

_service.mutualMatchesSearch = async function mutualMatchesSearch(id) {
  let userDetails = await myMatches.findOne({ userId: id });
  let otherUserDetails = [];
  if (userDetails) {
    let matcheDetails = await myMatches
      .find({
        matchId: { $in: id },
      })
      .populate("userId")
      .sort({ updatedOn: -1 });
    otherUserDetails = matcheDetails;
  }
  return otherUserDetails;
};

_service.MuslimWomenForMarriage = async function MuslimWomenForMarriage() {
  let findUser = await users.find({ gender: "Female" });
  return findUser;
};

_service.matchIdSearch = async function matchIdSearch(objToSave) {
  try {
    let criteria = {
      userId: objToSave._id,
    };
    let dataToSet = { $addToSet: { matchId: objToSave.matchId } };
    let options = {
      upsert: true,
      new: true,
      runValidators: true,
    };
    let result = await myMatches.findOneAndUpdate(criteria, dataToSet, options);
    return result;
  } catch (error) {
    throw error;
  }
};

_service.unmatchIdSearch = async function unMatchesSearch(objToSave) {
  try {
    let criteria = {
      userId: objToSave._id,
    };
    let dataToSet = { $pull: { matchId: objToSave.matchId } };
    let options = {
      upsert: true,
      new: true,
      runValidators: true,
    };

    let result = await myMatches.findOneAndUpdate(criteria, dataToSet, options);
  } catch (error) {
    throw error;
  }
};

_service.newMemberSearch = async (id) => {
  let result = await users.find({ _id: { $ne: id } }).sort({ updateOn: -1 });
  return result;
};

module.exports = _service;

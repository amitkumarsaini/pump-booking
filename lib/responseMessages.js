
module.exports = {
  USERNOTFOUND: "User not found.",
  LOGINSUCCESSFULL: "Logged in successfully.",
  PASSWORDNOTMATCH: "password is incorrect.",
  NEWREGISTRATION: "New user registered",
  REGISTRATIONFAILED: "Registration failed.",
  NODATAFOUND: "No data found",
  BLOCKED: "Sorry! your account is blocked.",
  ERROR: "Some error occurred.",
  UNIQUEERROR: (name) => {
    return name + " already exists.";
  },
  UNAUTHORIZED: "Unauthorized , unable to do the action.",
  DATAADDED: "Data added successfully.",
  NOIMAGE: "No Image, Please Pass An Image ",
  IMAGEUPLOADED: "Image uploaded successfully.",
};

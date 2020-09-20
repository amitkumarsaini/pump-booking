/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com */
module.exports = {
  USERNOTFOUND: "User not found.",
  LOGINSUCCESSFULL: "Logged in successfully.",
  PASSWORDNOTMATCH: "password is incorrect.",
  NEWREGISTRATION: "New user registered",
  REGISTRATIONFAILED: "Registration failed.",
  NODATAFOUND: "No data found",
  USERNOTVERIFIED: "Your email is not verified. Please verify your email.",
  BLOCKED: "Sorry! your account is blocked.",
  EMAILVERIFYED: "Email verified successfully.",
  CODENOTMATCHED: "Verification code not matched!",
  ERRORONVERIFICATION: "some error occurred during verification",
  ERRORONUPDATE: "error occurred during updating",
  ERROR: "Some error occurred.",
  PASSWORDCHANGED: "Password changed successfully.",
  USEREDITED: "User updated successfully.",
  USERDELETED: "User deleted successfully.",
  SETTINGSCHANGED: "Settings changed successfully.",
  SENTEMAIL: "Email sent successfully.",
  ERRORONSENDMAIL: "Some error occurred during send mail.",
  UNIQUEERROR: (name) => {
    return name + " already exists.";
  },
  UNAUTHORIZED: "Unauthorized , unable to do the action.",
  DATAADDED: "Data added successfully.",
  NOIMAGE: "No Image, Please Pass An Image ",
  IMAGEUPLOADED: "Image uploaded successfully.",
  RECORDDELETE: "Record deleted successfully.",
  RECORDFOUND: "Record found.",
  UPDATEDSUCCESS: (name) => {
    return name + " updated successfully.";
  },
  RECORDSUCCESS: (name) => {
    return name + " sent successfully.";
  },
  REMOVEDSUCCESS: (name) => {
    return name + " removed successfully.";
  },
};
